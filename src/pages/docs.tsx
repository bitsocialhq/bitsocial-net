import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "@/components/footer";
import Topbar from "@/components/topbar";
import { getScrollBehavior } from "@/lib/utils";

const protocolNotes = [
  {
    id: "custom-challenges",
    title: "Custom anti-spam challenges",
    description:
      "Each Bitsocial community can decide what a valid post requires. The challenge can be as simple as a captcha or account-age check, or as opinionated as SMS verification, payments, token requirements, IP-based checks, allowlists, or any other rule that can be expressed in code.",
    detail:
      "That matters because spam resistance is not outsourced to a global company policy. The community node itself communicates the challenge peer-to-peer, so each community can adapt its own defenses without forcing the whole network into one moderation model.",
  },
  {
    id: "local-moderation",
    title: "Local moderation, not global bans",
    description:
      "Community owners moderate their own spaces, and app developers can decide what their client indexes or highlights. What Bitsocial does not have is a protocol-level admin that can confiscate a community or ban an identity from the entire network.",
    detail:
      "If one app filters you, another app can still choose to show you. If one community rejects you, another community can accept you or you can create your own. Moderation exists, but it stays local instead of collapsing into one global choke point.",
  },
  {
    id: "identity-and-ownership",
    title: "Identity and community ownership",
    description:
      "Profiles and communities are controlled by keypairs, not by revocable platform accounts. You can keep control of the private key while delegating uptime or hosting to another service, which means assistance does not have to become custody.",
    detail:
      "That makes a Bitsocial identity closer to a wallet-controlled asset than a username rented from a company. Hosting can be replaced; ownership does not have to be surrendered just to stay online.",
  },
];

export default function Docs() {
  const location = useLocation();

  useLayoutEffect(() => {
    const hash = location.hash.slice(1);
    if (!hash) return;

    let cancelled = false;
    const id = requestAnimationFrame(() => {
      if (cancelled) return;
      const target = document.getElementById(hash);
      target?.scrollIntoView({ behavior: getScrollBehavior(), block: "start" });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(id);
    };
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      <Topbar />
      <main className="pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-6 chrome-text">Protocol Notes</h1>
          <div className="glass-card p-8 mb-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Bitsocial is a peer-to-peer social protocol built around communities, cheap nodes, and
              local control instead of global platform choke points. These notes cover the core
              mechanics that make the network different from federated or chain-based social media.
            </p>
            <div className="flex flex-wrap gap-3">
              {protocolNotes.map((note) => (
                <a
                  key={note.id}
                  href={`#${note.id}`}
                  className="rounded-full border border-border/60 bg-background/50 px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:border-blue-glow"
                >
                  {note.title}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {protocolNotes.map((note) => (
              <section
                key={note.id}
                id={note.id}
                className="glass-card p-8 scroll-mt-32"
                aria-labelledby={`${note.id}-title`}
              >
                <h2
                  id={`${note.id}-title`}
                  className="text-2xl font-display font-semibold text-foreground mb-4"
                >
                  {note.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">{note.description}</p>
                <p className="text-muted-foreground leading-relaxed">{note.detail}</p>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
