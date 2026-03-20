import { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

interface Point {
  x: number;
  y: number;
}

interface TriData {
  a: number;
  b: number;
  c: number;
  cx: number;
  cy: number;
  glow: number;
}

const SPACING = 85;
const JITTER_FACTOR = 0.42;
const GLOW_RADIUS = 150;
const GLOW_EASE_IN = 0.14;
const GLOW_EASE_OUT = 0.045;
const MAX_FILL_OPACITY = 0.14;
const EDGE_BASE_WIDTH = 0.5;
const EDGE_GLOW_WIDTH = 1;
const DOT_RADIUS = 1.2;

const AMBIENT_FADE_IN = 2200;
const AMBIENT_HOLD = 1800;
const AMBIENT_FADE_OUT = 2800;
const AMBIENT_DELAY_MIN = 2000;
const AMBIENT_DELAY_MAX = 5000;
const AMBIENT_MAX_ACTIVE = 2;
const AMBIENT_GLOW_RADIUS = 130;
const AMBIENT_MAX_FILL = 0.1;

const BLUE_R = 37;
const BLUE_G = 99;
const BLUE_B = 235;

function generateMesh(width: number, height: number) {
  const cols = Math.ceil(width / SPACING) + 2;
  const rows = Math.ceil(height / SPACING) + 2;
  const jitter = SPACING * JITTER_FACTOR;
  const totalCols = cols + 2;

  const points: Point[] = [];
  for (let row = -1; row <= rows; row++) {
    for (let col = -1; col <= cols; col++) {
      points.push({
        x: col * SPACING + (Math.random() - 0.5) * jitter,
        y: row * SPACING + (Math.random() - 0.5) * jitter,
      });
    }
  }

  const idx = (r: number, c: number) => (r + 1) * totalCols + (c + 1);
  const triangles: TriData[] = [];

  function addTri(a: number, b: number, c: number) {
    triangles.push({
      a,
      b,
      c,
      cx: (points[a].x + points[b].x + points[c].x) / 3,
      cy: (points[a].y + points[b].y + points[c].y) / 3,
      glow: 0,
    });
  }

  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      const tl = idx(r, c);
      const tr = idx(r, c + 1);
      const bl = idx(r + 1, c);
      const br = idx(r + 1, c + 1);
      if (Math.random() > 0.5) {
        addTri(tl, tr, br);
        addTri(tl, br, bl);
      } else {
        addTri(tl, tr, bl);
        addTri(tr, br, bl);
      }
    }
  }

  const edgeSet = new Set<string>();
  const edges: [number, number][] = [];
  for (const t of triangles) {
    for (const pair of [
      [t.a, t.b],
      [t.b, t.c],
      [t.a, t.c],
    ] as [number, number][]) {
      const k = pair[0] < pair[1] ? `${pair[0]}-${pair[1]}` : `${pair[1]}-${pair[0]}`;
      if (!edgeSet.has(k)) {
        edgeSet.add(k);
        edges.push(pair);
      }
    }
  }

  return { points, triangles, edges };
}

interface AmbientSource {
  x: number;
  y: number;
  t0: number;
  phase: 0 | 1 | 2;
}

function ambientIntensity(s: AmbientSource, now: number): number {
  const dt = now - s.t0;
  if (s.phase === 0) {
    if (dt >= AMBIENT_FADE_IN) {
      s.phase = 1;
      s.t0 = now;
      return 1;
    }
    return dt / AMBIENT_FADE_IN;
  }
  if (s.phase === 1) {
    if (dt >= AMBIENT_HOLD) {
      s.phase = 2;
      s.t0 = now;
      return 1;
    }
    return 1;
  }
  if (dt >= AMBIENT_FADE_OUT) return -1;
  return 1 - dt / AMBIENT_FADE_OUT;
}

function initMesh(
  canvas: HTMLCanvasElement,
  container: HTMLElement,
  ctx: CanvasRenderingContext2D,
  isDark: boolean,
  hasHover: boolean,
): () => void {
  const edgeAlpha = isDark ? 0.055 : 0.085;
  const dotAlpha = isDark ? 0.06 : 0.1;
  const edgeRGB = isDark ? "255,255,255" : "100,116,139";
  const dotRGB = isDark ? "255,255,255" : "100,116,139";

  let w = container.clientWidth;
  let h = container.clientHeight;
  const dpr = Math.min(window.devicePixelRatio, 1.5);

  function setCanvasSize() {
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  setCanvasSize();

  let mesh = generateMesh(w, h);

  let mx = -9999;
  let my = -9999;
  let mouseIn = false;

  function onMove(e: MouseEvent) {
    if (!hasHover) return;
    const r = canvas.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
    mouseIn = mx >= -50 && mx <= w + 50 && my >= -50 && my <= h + 50;
  }

  function onLeave() {
    mouseIn = false;
    mx = -9999;
    my = -9999;
  }

  window.addEventListener("mousemove", onMove, { passive: true });
  document.addEventListener("mouseleave", onLeave);

  let ambients: AmbientSource[] = [];
  let lastSpawn = 0;
  let nextDelay = AMBIENT_DELAY_MIN;

  function spawnAmbient(now: number) {
    if (ambients.length >= AMBIENT_MAX_ACTIVE) return;
    const i = Math.floor(Math.random() * mesh.triangles.length);
    ambients.push({ x: mesh.triangles[i].cx, y: mesh.triangles[i].cy, t0: now, phase: 0 });
    lastSpawn = now;
    nextDelay = AMBIENT_DELAY_MIN + Math.random() * (AMBIENT_DELAY_MAX - AMBIENT_DELAY_MIN);
  }

  let af: number;
  let lt = 0;
  const glowRadiusSq = GLOW_RADIUS * GLOW_RADIUS;
  const ambRadiusSq = AMBIENT_GLOW_RADIUS * AMBIENT_GLOW_RADIUS;

  function frame(now: number) {
    af = requestAnimationFrame(frame);
    if (now - lt < 33) return;
    lt = now;

    ctx.clearRect(0, 0, w, h);

    const pts = mesh.points;
    const tris = mesh.triangles;
    const edges = mesh.edges;

    if (hasHover) {
      for (const t of tris) {
        const dx = t.cx - mx;
        const dy = t.cy - my;
        const distSq = dx * dx + dy * dy;
        if (!mouseIn || distSq > glowRadiusSq) {
          t.glow += (0 - t.glow) * GLOW_EASE_OUT;
        } else {
          const dist = Math.sqrt(distSq);
          const tgt = (1 - dist / GLOW_RADIUS) ** 2;
          t.glow += (tgt - t.glow) * (tgt > t.glow ? GLOW_EASE_IN : GLOW_EASE_OUT);
        }
      }
    } else {
      if (now - lastSpawn > nextDelay) spawnAmbient(now);
      for (const t of tris) {
        let maxTgt = 0;
        for (const s of ambients) {
          const intensity = ambientIntensity(s, now);
          if (intensity < 0) continue;
          const dx = t.cx - s.x;
          const dy = t.cy - s.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < ambRadiusSq) {
            const d = Math.sqrt(dSq);
            maxTgt = Math.max(maxTgt, (1 - d / AMBIENT_GLOW_RADIUS) ** 2 * intensity);
          }
        }
        t.glow += (maxTgt - t.glow) * (maxTgt > t.glow ? 0.035 : 0.025);
      }
      ambients = ambients.filter((s) => ambientIntensity(s, now) >= 0);
    }

    // Atmospheric radial glow at cursor
    if (mouseIn && hasHover) {
      const rr = GLOW_RADIUS * 1.4;
      const grad = ctx.createRadialGradient(mx, my, 0, mx, my, rr);
      grad.addColorStop(0, `rgba(${BLUE_R},${BLUE_G},${BLUE_B},0.04)`);
      grad.addColorStop(1, `rgba(${BLUE_R},${BLUE_G},${BLUE_B},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(mx - rr, my - rr, rr * 2, rr * 2);
    }

    // Glow triangle fills
    for (const t of tris) {
      if (t.glow < 0.005) continue;
      const opacity = t.glow * (hasHover ? MAX_FILL_OPACITY : AMBIENT_MAX_FILL);
      ctx.fillStyle = `rgba(${BLUE_R},${BLUE_G},${BLUE_B},${opacity})`;
      ctx.beginPath();
      ctx.moveTo(pts[t.a].x, pts[t.a].y);
      ctx.lineTo(pts[t.b].x, pts[t.b].y);
      ctx.lineTo(pts[t.c].x, pts[t.c].y);
      ctx.closePath();
      ctx.fill();
    }

    // Base mesh edges
    ctx.strokeStyle = `rgba(${edgeRGB},${edgeAlpha})`;
    ctx.lineWidth = EDGE_BASE_WIDTH;
    ctx.beginPath();
    for (const [a, b] of edges) {
      ctx.moveTo(pts[a].x, pts[a].y);
      ctx.lineTo(pts[b].x, pts[b].y);
    }
    ctx.stroke();

    // Glow edges
    for (const t of tris) {
      if (t.glow < 0.05) continue;
      ctx.strokeStyle = `rgba(${BLUE_R},${BLUE_G},${BLUE_B},${t.glow * 0.35})`;
      ctx.lineWidth = EDGE_GLOW_WIDTH;
      ctx.beginPath();
      ctx.moveTo(pts[t.a].x, pts[t.a].y);
      ctx.lineTo(pts[t.b].x, pts[t.b].y);
      ctx.lineTo(pts[t.c].x, pts[t.c].y);
      ctx.closePath();
      ctx.stroke();
    }

    // Vertex dots (P2P network nodes)
    ctx.fillStyle = `rgba(${dotRGB},${dotAlpha})`;
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  af = requestAnimationFrame(frame);

  let resizeTimer: ReturnType<typeof setTimeout>;
  const ro = new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      w = container.clientWidth;
      h = container.clientHeight;
      if (w > 0 && h > 0) {
        setCanvasSize();
        mesh = generateMesh(w, h);
      }
    }, 200);
  });
  ro.observe(container);

  return () => {
    cancelAnimationFrame(af);
    clearTimeout(resizeTimer);
    window.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseleave", onLeave);
    ro.disconnect();
  };
}

export default function PolygonMeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark =
      resolvedTheme === "dark" ||
      (!resolvedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const hasHover = window.matchMedia("(hover: hover)").matches;

    return initMesh(canvas, container, ctx, isDark, hasHover);
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div
        className="absolute top-0 left-0 right-0 h-48 md:h-64 pointer-events-none"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.85) 25%, hsl(var(--background) / 0.5) 55%, transparent 100%)",
        }}
      />
    </div>
  );
}
