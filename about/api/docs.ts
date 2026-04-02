const DOCS_ORIGIN = "https://bitsocial-docs-toms-projects-2188af94.vercel.app";

function buildUpstreamUrl(requestUrl: string) {
  const incomingUrl = new URL(requestUrl);
  const searchParams = new URLSearchParams(incomingUrl.search);
  const path = searchParams.get("path") ?? "";

  searchParams.delete("path");

  const normalizedPath = path ? `/${path}` : "/";
  const upstreamUrl = new URL(normalizedPath, DOCS_ORIGIN);
  const upstreamQuery = searchParams.toString();

  if (upstreamQuery) {
    upstreamUrl.search = upstreamQuery;
  }

  return upstreamUrl;
}

function buildUpstreamHeaders(request: Request) {
  const headers = new Headers(request.headers);

  headers.delete("host");
  headers.delete("x-forwarded-host");

  return headers;
}

export default {
  async fetch(request: Request) {
    const upstreamResponse = await fetch(buildUpstreamUrl(request.url), {
      method: request.method === "HEAD" ? "HEAD" : "GET",
      headers: buildUpstreamHeaders(request),
      redirect: "manual",
    });

    return new Response(upstreamResponse.body, {
      status: upstreamResponse.status,
      statusText: upstreamResponse.statusText,
      headers: upstreamResponse.headers,
    });
  },
};
