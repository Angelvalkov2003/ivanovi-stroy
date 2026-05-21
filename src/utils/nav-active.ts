import { trimSlash } from '~/utils/permalinks';

export function normalizeNavPath(path: string): string {
  if (!path) return '/';
  try {
    const pathname = path.startsWith('http') ? new URL(path).pathname : path;
    const trimmed = trimSlash(pathname);
    return trimmed ? `/${trimmed}` : '/';
  } catch {
    return '/';
  }
}

/** Активен линк в navbar — текуща страница + подстраници (напр. /uslugi/* → Услуги) */
export function isNavLinkActive(href: string | undefined, pathname: string, label?: string): boolean {
  if (!href) return false;

  const link = normalizeNavPath(href);
  const current = normalizeNavPath(pathname);

  if (link === current) return true;

  if (label === 'Услуги' || link === '/services') {
    return current === '/services' || current.startsWith('/uslugi/') || current === '/uslugi';
  }

  if (link !== '/' && current.startsWith(`${link}/`)) return true;

  return false;
}

export const navLinkActiveClass = 'text-[#c79305] font-semibold';
