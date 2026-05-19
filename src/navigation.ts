import { getPermalink } from './utils/permalinks';
import { SITE_CONTACT, SITE_BRAND } from './data/site';

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
      links: [
        { text: 'Къртене и извозване', href: getPermalink('/services#demolition') },
        { text: 'Гипс картон', href: getPermalink('/services#gips') },
        { text: 'Боя и шпакловка', href: getPermalink('/services#boya') },
        { text: 'Плочки и баня', href: getPermalink('/services#plochki') },
        { text: 'Кофраж и бетон', href: getPermalink('/services#beton') },
        { text: 'Покриви', href: getPermalink('/services#pokrivi') },
        { text: 'ВиК и ЕЛ', href: getPermalink('/services#vik-el') },
      ],
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
