/** Site SEO / GEO config — set VITE_SITE_URL to your production domain before deploy */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.zzsky.com').replace(/\/$/, '')

export const siteMeta = {
  brand: 'ZZSKY',
  legalName: 'ZZSKY Industrial Equipment',
  tagline: 'Precision Tube & Sheet Fiber Laser Cutting Machines',
  description:
    'ZZSKY supplies SEG series fiber laser tube and sheet cutting machines — standard, offside, no-CAD and flat-sheet models for furniture, fitness, automotive and metal fabrication. Factory in Huixian, Xinxiang, Henan, China.',
  keywords: [
    'fiber laser tube cutter',
    'laser pipe cutting machine',
    'sheet fiber laser',
    'SEG-T160',
    'SEG-T130Y',
    'no-CAD tube laser',
    'ZZSKY',
    'Henan laser cutting machine',
    'laser sheet cutter'
  ].join(', '),
  locale: 'en_US',
  alternateLocale: 'en_GB',
  contactEmail: 'sales@aorelaser.cn',
  contactPhone: '+86-400-832-8321',
  address: {
    street: 'Mengzhuang Industrial Park',
    locality: 'Huixian',
    region: 'Xinxiang, Henan',
    country: 'CN',
    countryName: 'China'
  },
  sameAs: [],
  ogImage: `${SITE_URL}/logo.svg`,
  twitterHandle: ''
}

export const homeFaqs = [
  {
    question: 'What laser cutting machines does ZZSKY offer?',
    answer:
      'ZZSKY offers SEG series fiber laser equipment including standard round/square tube cutters (SEG-T120, T160, T240), offside tube laser SEG-T130Y, no-CAD dual-pneumatic SEG-T100M, and sheet lasers SEG-2513 / SEG-3015.'
  },
  {
    question: 'Where is ZZSKY manufacturing based?',
    answer:
      'Production is based in Mengzhuang Industrial Park, Huixian, Xinxiang, Henan Province, China, serving global industrial buyers.'
  },
  {
    question: 'What tube sizes can SEG tube lasers cut?',
    answer:
      'Depending on the model, effective tube diameters range from about 10–120mm (T120) up to 15–230mm (T240). SEG-T130Y covers roughly round 19–125mm and square 19–100mm.'
  },
  {
    question: 'Do you support no-CAD / easy programming tube cutting?',
    answer:
      'Yes. SEG-T100M features a dual-pneumatic no-CAD system with column and guardrail modes, 10-inch touchscreen, and auto wall-thickness compensation for common shop jobs.'
  },
  {
    question: 'How can I get a quote?',
    answer:
      'Submit the contact form on the website or email sales@aorelaser.cn. Our team typically responds within 24 hours with configuration and pricing guidance.'
  }
]
