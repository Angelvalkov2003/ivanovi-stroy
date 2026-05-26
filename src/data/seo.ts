import { SITE, METADATA } from 'astrowind:config';
import { SITE_BRAND, SITE_CONTACT } from '~/data/site';
import type { ServiceCategory } from '~/data/services';
import { getServiceContent } from '~/data/service-content';

export const SEO_LOCALE = 'bg_BG';

export { isNoIndexPath, NOINDEX_PATH_PATTERNS } from '~/data/seo-paths';

export function absoluteUrl(path: string): string {
  const base = SITE?.site || 'https://ivanovi-stroy.vercel.app';
  try {
    return new URL(path.startsWith('/') ? path : `/${path}`, base).href;
  } catch {
    return base;
  }
}

export function getSiteStructuredData() {
  const url = SITE?.site || 'https://ivanovi-stroy.vercel.app';
  const logo = absoluteUrl('/logo.jpg');

  return [
    {
      '@type': 'WebSite',
      '@id': `${url}/#website`,
      url,
      name: SITE_BRAND.name,
      description: METADATA?.description || SITE_BRAND.description,
      inLanguage: 'bg-BG',
      publisher: { '@id': `${url}/#organization` },
    },
    {
      '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
      '@id': `${url}/#organization`,
      name: SITE_BRAND.name,
      description: SITE_BRAND.description,
      url,
      logo: { '@type': 'ImageObject', url: logo },
      image: logo,
      telephone: SITE_CONTACT.phoneTel,
      email: SITE_CONTACT.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'София',
        addressRegion: 'София',
        addressCountry: 'BG',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 42.6977,
        longitude: 23.3219,
      },
      areaServed: [
        { '@type': 'City', name: 'София' },
        { '@type': 'AdministrativeArea', name: 'София-град' },
        { '@type': 'AdministrativeArea', name: 'София-област' },
      ],
      priceRange: '$$',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
      sameAs: [SITE_CONTACT.whatsapp],
    },
  ];
}

export function getBreadcrumbList(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getServiceStructuredData(category: ServiceCategory) {
  const content = getServiceContent(category.id);
  const pageUrl = absoluteUrl(`/uslugi/${category.slug}`);

  return {
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name: `${category.title} — ${SITE_BRAND.name}`,
    description: content.metaDescription,
    url: pageUrl,
    provider: { '@id': `${SITE?.site}/#organization` },
    areaServed: { '@type': 'City', name: 'София' },
    serviceType: category.title,
  };
}

export function getServicesItemList(categories: ServiceCategory[]) {
  return {
    '@type': 'ItemList',
    name: 'Строителни услуги',
    itemListElement: categories.map((cat, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: cat.title,
      url: absoluteUrl(`/uslugi/${cat.slug}`),
    })),
  };
}

export function getServicePageMeta(category: ServiceCategory) {
  const content = getServiceContent(category.id);
  const title = `${category.title} София | ${SITE_BRAND.name}`;
  const description = content.metaDescription;
  const keywords = [
    category.title,
    `${category.title} София`,
    'строителни услуги София',
    SITE_BRAND.name,
    'майстори София',
    category.teaser,
  ]
    .filter(Boolean)
    .join(', ');

  return {
    title,
    description,
    keywords,
    canonical: absoluteUrl(`/uslugi/${category.slug}`),
    openGraph: {
      type: 'article',
      locale: SEO_LOCALE,
    },
  };
}

export function getHomeFaqStructuredData() {
  const faqs = [
    {
      q: 'Предлагате ли безплатен оглед и оферта в София?',
      a: 'Да — Иванови Строй идва на място за безплатен оглед и писмена оферта в София и областта, без ангажимент.',
    },
    {
      q: 'Какви строителни услуги извършвате?',
      a: 'Къртене, извозване, кофраж, бетон, гипсокартон, шпакловка, боя, плочки, баня, покриви, ВиК, ЕЛ и груб строеж.',
    },
    {
      q: 'Работите ли с най-ниски цени в София?',
      a: 'Предлагаме конкурентни и прозрачни цени — сравнете нашата оферта след безплатния оглед.',
    },
    {
      q: 'В кои райони работите?',
      a: 'София, София-град и София-област — по договаряне и в близките населени места.',
    },
  ];

  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export const PAGE_KEYWORDS = {
  home:
    'строителна фирма София, най-ниски цени, безплатен оглед, кърти чисти извозва, строителни услуги, ремонти до ключ, кофраж, бетон, ВиК, ЕЛ, Иванови Строй',
  services:
    'строителни услуги София, гипсокартон, шпакловка, боядисване, плочки, баня, покриви, кофраж, всички ремонтни дейности',
  about: 'Иванови Строй, строителна фирма София, Дани Иванов, кърти чисти извозва',
  contact: 'контакти строителна фирма София, телефон майстор, безплатен оглед, Иванови Строй',
};
