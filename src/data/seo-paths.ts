/** Demo/template routes — не индексираме в Google */
export const NOINDEX_PATH_PATTERNS = [
  /^\/homes(\/|$)/,
  /^\/landing(\/|$)/,
  /^\/pricing\/?$/,
  /^\/404\/?$/,
  /^\/tag(\/|$)/,
  /^\/category(\/|$)/,
  /^\/blog(\/|$)/,
];

export function isNoIndexPath(pathname: string): boolean {
  const path = pathname.replace(/\/$/, '') || '/';
  return NOINDEX_PATH_PATTERNS.some((re) => re.test(path));
}
