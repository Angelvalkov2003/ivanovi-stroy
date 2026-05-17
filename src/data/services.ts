export interface ServiceImage {
  src: string;
  alt: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  icon: string;
  summary: string;
  images?: ServiceImage[];
  subsections?: { title: string; images: ServiceImage[] }[];
}

const unsplash = (id: string, alt: string): ServiceImage => ({
  src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`,
  alt,
});

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'demolition',
    title: 'Къртене и извозване',
    icon: 'tabler:hammer',
    summary: 'Къртене на бетон, тухли, плочки. Извозване до лицензирани депа.',
    images: [
      unsplash('photo-1504307651254-35680f356dfd', 'Къртене на строителни конструкции'),
      unsplash('photo-1581094794329-c8112a89af12', 'Извозване на строителни отпадъци'),
      unsplash('photo-1541888946425-d81bb19240f5', 'Демонтаж и почистване на обект'),
    ],
  },
  {
    id: 'gips',
    title: 'Гипс картон',
    icon: 'tabler:layout-board',
    summary: 'Окачени тавани, преградни стени, куфари и довършителни работи с гипсокартон.',
    images: [
      unsplash('photo-1503387767-592deb58ef4e', 'Монтаж на гипсокартон'),
      unsplash('photo-1621905251189-08b45d6f269e', 'Окачен таван с гипсокартон'),
      unsplash('photo-1581578731548-c64695cc6952', 'Преградна стена от гипсокартон'),
      unsplash('photo-1600585154340-be6161a56a0c', 'Вътрешен ремонт с гипсокартон'),
    ],
  },
  {
    id: 'beton',
    title: 'Бетон и кофраж',
    icon: 'tabler:building-factory-2',
    summary: 'Кофраж, изливане на бетон, бетонови площадки и щампован бетон.',
    subsections: [
      {
        title: 'Бетонови площадки',
        images: [
          unsplash('photo-1558618666-fcd25c85f82e', 'Бетонова площадка'),
          unsplash('photo-1595846519845-68bb3374e60d', 'Изливане на бетон'),
          unsplash('photo-1503387767-592deb58ef4e', 'Армиран бетон и основи'),
        ],
      },
      {
        title: 'Щампован бетон',
        images: [
          unsplash('photo-1600607687939-ce8a6c25118c', 'Декоративен щампован бетон'),
          unsplash('photo-1600566753190-17f0baa2a6c3', 'Щампована бетонова настилка'),
          unsplash('photo-1600585154526-990dced4db0d', 'Декоративен бетон в двора'),
        ],
      },
    ],
  },
  {
    id: 'vik-el',
    title: 'ВиК и ЕЛ',
    icon: 'tabler:bolt',
    summary: 'Водопровод, канализация, електроинсталации и окабеляване.',
    images: [
      unsplash('photo-1621905252507-b35492da74e4', 'ВиК инсталации'),
      unsplash('photo-1621905251189-08b45d6f269e', 'Електро монтаж'),
      unsplash('photo-1581094794329-c8112a89af12', 'Ремонт на тръби и канализация'),
    ],
  },
  {
    id: 'finishing',
    title: 'Довършителни работи',
    icon: 'tabler:paint',
    summary: 'Шпакловка, боядисване, ламинат, мазилки и гипсокартон.',
    images: [
      unsplash('photo-1562259949-e8e7689d7822', 'Шпакловка и боядисване'),
      unsplash('photo-1615873968403-89e068629265', 'Монтаж на ламинат'),
      unsplash('photo-1600607687644-c7171b42498f', 'Вътрешен ремонт'),
    ],
  },
  {
    id: 'bathroom',
    title: 'Баня и плочки',
    icon: 'tabler:bath',
    summary: 'Ремонт на баня до ключ, лепене на плочки, фаянс и гранитогрес.',
    images: [
      unsplash('photo-1552321554-5fefe8c9ef14', 'Ремонт на баня'),
      unsplash('photo-1600566753086-00f18fb6b3ea', 'Лепене на плочки'),
      unsplash('photo-1600585154340-be6161a56a0c', 'Баня до ключ'),
    ],
  },
];

export const mainServices = [
  'Къртене на бетон, тухли, плочки',
  'Почистване на апартаменти, мазета, дворове',
  'Извозване на строителни отпадъци',
  'Демонтаж на стари мебели и конструкции',
  'Строителни услуги и ремонти до ключ',
  'Кофраж, бетонови площадки и щампован бетон',
  'ВиК и ЕЛ услуги',
  'Шпакловка, боя, ламинат, баня и плочки',
];

export const whyChooseUs = [
  'Бързо и коректно обслужване',
  'Конкурентни цени',
  'Работа без почивен ден',
  'Извозване до лицензирани депа',
  'Професионално оборудване',
  'Екологично депониране на отпадъци',
];
