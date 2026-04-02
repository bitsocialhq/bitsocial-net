export const DOCS_LINKS = {
  home: "/docs/",
  search: "/docs/search/",
  customChallenges: "/docs/custom-challenges/",
  localModeration: "/docs/local-moderation/",
  identityAndOwnership: "/docs/identity-and-ownership/",
  buildImageboardClient: "/docs/developer-tools/build-an-imageboard-client/",
  permissionlessPublicRpc: "/docs/permissionless-public-rpc/",
  bitsocialNetwork: "/docs/bitsocial-network/",
  decentralizeAllSocialMedia: "/docs/decentralize-all-social-media/",
} as const;

export function isDocsPath(pathOrHref: string) {
  return pathOrHref === "/docs" || pathOrHref === "/docs/" || pathOrHref.startsWith("/docs/");
}
