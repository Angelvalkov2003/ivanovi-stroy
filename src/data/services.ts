import fs from 'node:fs';
import path from 'node:path';

import { SERVICE_SLUGS } from './service-slugs';

export interface ServiceImage {
  src: string;
  alt: string;
  placeholder?: boolean;
}

export interface ServiceSubsection {
  title: string;
  images: ServiceImage[];
}

export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  icon: string;
  summary: string;
  teaser?: string;
  images?: ServiceImage[];
  subsections?: ServiceSubsection[];
}

const PLACEHOLDER_SRC = '/placeholders/gallery-placeholder.svg';
const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGE_EXT = /\.(webp|jpe?g|png)$/i;

const local = (folder: string, file: string, alt: string): ServiceImage => ({
  src: `/${folder}/${file}`,
  alt,
});

/** Зарежда всички снимки от папка в public/ */
export function imagesFromFolder(folder: string, label: string): ServiceImage[] {
  const dirPath = path.join(PUBLIC_DIR, folder);
  if (!fs.existsSync(dirPath)) return [];

  return fs
    .readdirSync(dirPath)
    .filter((name) => IMAGE_EXT.test(name))
    .sort((a, b) => a.localeCompare(b, 'bg'))
    .map((file) => local(folder, file, `${label} — Иванови Строй`));
}

const fromFolders = (folders: string[], label: string): ServiceImage[] =>
  folders.flatMap((folder) => imagesFromFolder(folder, label));

const placeholderSlots = (label: string, count = 3): ServiceImage[] =>
  Array.from({ length: count }, (_, i) => ({
    src: PLACEHOLDER_SRC,
    alt: `${label} — снимка ${i + 1} (скоро)`,
    placeholder: true,
  }));

/** Реални снимки или placeholder-и (за категории без качени файлове) */
const categoryImages = (folders: string | string[], label: string): ServiceImage[] => {
  const list = Array.isArray(folders) ? folders : [folders];
  const real = fromFolders(list, label);
  return real.length > 0 ? real : placeholderSlots(label);
};

const rawServiceCategories: Omit<ServiceCategory, 'slug'>[] = [
  {
    id: 'demolition',
    title: 'Къртене и извозване',
    icon: 'tabler:hammer',
    summary:
      'Къртене на бетон, тухли и плочки. Почистване на апартаменти, мазета и дворове. Извозване до лицензирани депа.',
    teaser: 'Кърти • чисти • извозва — бързо и коректно.',
    images: categoryImages('kurtane', 'Къртене и извозване'),
  },
  {
    id: 'gips',
    title: 'Гипс картон',
    icon: 'tabler:layout-board',
    summary:
      'Окачени тавани, преградни стени, куфари и ниши. Монтаж, шпакловка и подготовка за боя.',
    teaser: 'Куфари, тавани и прегради с гипсокартон.',
    images: categoryImages('gips', 'Гипс картон'),
  },
  {
    id: 'zamaski',
    title: 'Замаски',
    icon: 'tabler:shield',
    summary: 'Защитни замаски преди боя и мазилки — чисти ръбове и безупречен финиш.',
    teaser: 'Прецизна подготовка преди боядисване.',
    images: categoryImages('zamaski', 'Замаски'),
  },
  {
    id: 'shpaklovka',
    title: 'Шпакловка',
    icon: 'tabler:brush',
    summary: 'Шпакловка на стени и тавани, изравняване и подготовка за латекс или боя.',
    teaser: 'Гладки стени, готови за боя.',
    images: categoryImages('shpaklovka', 'Шпакловка'),
  },
  {
    id: 'boya',
    title: 'Боядисване',
    icon: 'tabler:paint',
    summary: 'Вътрешно и външно боядисване — латекс, фасадни бои и декоративни покрития.',
    teaser: 'Свежи цветове и равномерен финиш.',
    images: categoryImages('boya', 'Боядисване'),
  },
  {
    id: 'mazilka',
    title: 'Мазилки',
    icon: 'tabler:spray',
    summary: 'Вътрешни и външни мазилки, декоративни мазилки и фини шпакловъчни слоеве.',
    teaser: 'Класически и декоративни мазилки.',
    images: categoryImages('mazilka', 'Мазилки'),
  },
  {
    id: 'laminat',
    title: 'Ламинат',
    icon: 'tabler:layout-grid',
    summary: 'Подлагане, редене на ламинат и первази. Подготовка на основата и изравняване.',
    teaser: 'Топъл и издръжлив под на ламинат.',
    images: categoryImages('laminat', 'Ламинат'),
  },
  {
    id: 'parket',
    title: 'Паркет',
    icon: 'tabler:box',
    summary: 'Монтаж на паркет, циклене и лакиране. Естествена дървесина с дълъг живот.',
    teaser: 'Елегантен паркет с професионален монтаж.',
    images: categoryImages('parket', 'Паркет'),
  },
  {
    id: 'plochki',
    title: 'Плочки и баня',
    icon: 'tabler:bath',
    summary: 'Лепене на плочки, фаянс, теракот и гранитогрес. Баня до ключ.',
    teaser: 'Плочки за баня, кухня и под.',
    images: categoryImages('plochki_pod', 'Плочки'),
  },
  {
    id: 'zid',
    title: 'Зидария',
    icon: 'tabler:blocks',
    summary: 'Изграждане и ремонт на зидове, прегради и конструкции от тухла и блокове.',
    teaser: 'Здрави стени и прегради.',
    images: categoryImages('zid', 'Зидария'),
  },
  {
    id: 'kamyk',
    title: 'Декоративен камък',
    icon: 'tabler:diamond',
    summary: 'Облицовки с декоративен камък за стени, фасади и акценти в интериора.',
    teaser: 'Естествен камък с характер.',
    images: categoryImages('kamyk', 'Декоративен камък'),
  },
  {
    id: 'komin',
    title: 'Камини и комини',
    icon: 'tabler:flame',
    summary: 'Изграждане и облицовка на камини, коминни тела и димоотвеждане.',
    teaser: 'Топъл дом с камина или комин.',
    images: categoryImages('komin', 'Камини'),
  },
  {
    id: 'izolacia',
    title: 'Изолация',
    icon: 'tabler:temperature',
    summary: 'Топло- и хидроизолация на покриви, тераси, основи и фасади. Саниране.',
    teaser: 'Топлина, тишина и защита от влага.',
    images: categoryImages('izolacia', 'Изолация'),
  },
  {
    id: 'beton',
    title: 'Кофраж и бетон',
    icon: 'tabler:building-factory-2',
    summary: 'Кофраж, изливане на бетон, основи за къща, бетонови площадки и груб строеж.',
    teaser: 'От основи до готови бетонови площадки.',
    images: categoryImages(['kofrazh', 'beton_plochadki', 'shtampovan_beton'], 'Кофраж и бетон'),
  },
  {
    id: 'pokrivi',
    title: 'Покриви',
    icon: 'tabler:home-2',
    summary: 'Ремонт и изграждане на покриви, керемиди, ламария и хидроизолация.',
    teaser: 'Сух и сигурен покрив над главата ви.',
    images: categoryImages('pokrivi', 'Покриви'),
  },
  {
    id: 'keremidi',
    title: 'Керемиди',
    icon: 'tabler:stack-2',
    summary: 'Полагане и подмяна на керемиди, покривни системи и водоотвод.',
    teaser: 'Класически и модерни керемидени покриви.',
    images: categoryImages('keremidi', 'Керемиди'),
  },
  {
    id: 'vik-el',
    title: 'ВиК и ЕЛ',
    icon: 'tabler:bolt',
    summary: 'Водопровод, канализация, тръби, електроинсталации, ток и окабеляване.',
    teaser: 'Вода, тръби, ток — всичко по норма.',
    images: categoryImages(['vik', 'el'], 'ВиК и ЕЛ'),
  },
  {
    id: 'grub',
    title: 'Груб строеж',
    icon: 'tabler:building',
    summary: 'Вдигане на къщи, груб строеж, конструкции и координация на обекта.',
    teaser: 'От основа до готов груб строеж.',
    images: categoryImages('grub', 'Груб строеж'),
  },
];

export const serviceCategories: ServiceCategory[] = rawServiceCategories.map((cat) => ({
  ...cat,
  slug: SERVICE_SLUGS[cat.id] ?? cat.id,
}));

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return serviceCategories.find((c) => c.slug === slug);
}

export function getServicePermalink(slug: string): string {
  return `/uslugi/${slug}`;
}

export function getCategoryCover(cat: ServiceCategory): ServiceImage {
  if (cat.images?.length) {
    const first = cat.images.find((i) => !i.placeholder) ?? cat.images[0];
    return first;
  }
  if (cat.subsections?.length) {
    for (const sub of cat.subsections) {
      const first = sub.images.find((i) => !i.placeholder) ?? sub.images[0];
      if (first && !first.placeholder) return first;
    }
    return cat.subsections[0].images[0];
  }
  return { src: PLACEHOLDER_SRC, alt: cat.title, placeholder: true };
}

export const hasRealPhotos = (cat: ServiceCategory): boolean => {
  const all = cat.images ?? cat.subsections?.flatMap((s) => s.images) ?? [];
  return all.some((i) => !i.placeholder);
};

export function getCategoryRealImages(cat: ServiceCategory): ServiceImage[] {
  const all = cat.images ?? cat.subsections?.flatMap((s) => s.images) ?? [];
  return all.filter((i) => !i.placeholder);
}

export const galleryCategories = serviceCategories.filter(hasRealPhotos);

export const mainServices = [
  'Къртене, почистване и извозване на отпадъци',
  'Гипс картон, замаски и шпакловка',
  'Боя, мазилки, ламинат и паркет',
  'Плочки, баня до ключ и декоративен камък',
  'Кофраж, бетон, основи и щампован бетон',
  'Покриви, керемиди и изолация',
  'ВиК, вода, тръби, ток и ЕЛ инсталации',
  'Зидария, камини и груб строеж',
];

export const whyChooseUs = [
  'Бързо и коректно обслужване',
  'Конкурентни цени',
  'Работа без почивен ден',
  'Извозване до лицензирани депа',
  'Професионално оборудване',
  'Екологично депониране на отпадъци',
];
