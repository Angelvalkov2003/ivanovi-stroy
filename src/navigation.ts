import { getPermalink } from './utils/permalinks';
import { SITE_CONTACT, SITE_BRAND } from './data/site';
import { serviceCategories } from './data/services';

export const headerData = {
  links: [
    { text: 'Начало', href: getPermalink('/') },
    { text: 'Услуги', href: getPermalink('/services') },
    { text: 'За нас', href: getPermalink('/about') },
    { text: 'Контакти', href: getPermalink('/contact') },
  ],
  actions: [
    {
      text: `Обади се`,
      href: `tel:${SITE_CONTACT.phoneTel}`,
      variant: 'primary' as const,
      icon: 'tabler:phone',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Услуги',
      links: serviceCategories.slice(0, 7).map((cat) => ({
        text: cat.title,
        href: getPermalink(`/uslugi/${cat.slug}`),
      })),
    },
    {
      title: 'Компания',
      links: [
        { text: 'За нас', href: getPermalink('/about') },
        { text: 'Контакти', href: getPermalink('/contact') },
      ],
    },
    {
      title: 'Контакти',
      links: [
        { text: SITE_CONTACT.phoneIntl, href: `tel:${SITE_CONTACT.phoneTel}` },
        { text: SITE_CONTACT.email, href: `mailto:${SITE_CONTACT.email}` },
        { text: SITE_CONTACT.location, href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'WhatsApp', icon: 'tabler:brand-whatsapp', href: SITE_CONTACT.whatsapp },
    { ariaLabel: 'Viber', icon: 'tabler:phone', href: SITE_CONTACT.viber },
  ],
  footNote: `
    © ${new Date().getFullYear()} <strong>${SITE_BRAND.name}</strong> · ${SITE_BRAND.tagline} · ${SITE_BRAND.owner}
  `,
};
