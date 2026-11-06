/**
 * Verified festival facts.
 *
 * Every entry here is sourced from one of the references listed in
 * `sources`. Nothing in this file is invented: if a fact could not be
 * verified it is not included. Sample / illustrative content lives in
 * `events.js` and is labelled as such in the UI.
 */

export const sources = [
  {
    id: 'srmist-event',
    label: 'SRMIST — MILAN’26 event page',
    url: 'https://www.srmist.edu.in/events/milan-26/',
  },
  {
    id: 'srmist-news',
    label: 'SRMIST — “Celebrates the Spirit of Youth and Creativity with Milan 2026”',
    url: 'https://www.srmist.edu.in/srm-institute-of-science-and-technology-celebrates-the-spirit-of-youth-and-creativity-with-milan-2026/',
  },
  {
    id: 'wikipedia',
    label: 'Wikipedia — Milan (cultural festival)',
    url: 'https://en.wikipedia.org/wiki/Milan_(cultural_festival)',
  },
];

export const festival = {
  name: 'MILAN',
  meaning: 'Sanskrit for “coming together”',
  organiser: 'Directorate of Student Affairs, SRMIST',
  institution: 'SRM Institute of Science and Technology',
  campus: 'Kattankulathur, Chennai, Tamil Nadu',
  firstEdition: 2008,
  latestEdition: {
    label: 'MILAN’26',
    edition: '18th edition',
    startDate: '2026-02-19',
    endDate: '2026-02-22',
    displayDates: '19 – 22 February 2026',
    theme: 'Live the Change: Indian Maximalism',
  },
  nextEdition: {
    label: 'MILAN’27',
    status: 'Dates to be announced by the Directorate of Student Affairs',
  },
};

/** MILAN'26 participation figures as reported by SRMIST. */
export const stats = [
  { value: 60000, suffix: '+', label: 'students took part', source: 'srmist-news' },
  { value: 350, suffix: '', label: 'colleges', source: 'srmist-news' },
  { value: 28, suffix: '', label: 'states', source: 'srmist-news' },
  { value: 60, suffix: '+', label: 'countries', source: 'srmist-news' },
];

export const timeline = [
  {
    year: '2008',
    title: 'The first MILAN',
    text: 'The festival begins with roughly 25 events.',
    source: 'wikipedia',
  },
  {
    year: '2015',
    title: '100 hours, non-stop',
    text: 'The edition attempts a Guinness World Record with 100 hours of continuous events.',
    source: 'wikipedia',
  },
  {
    year: '2020',
    title: 'The 13th edition',
    text: 'Attendance is listed at 120,000+, with 100+ events across art, dance, music and sport.',
    source: 'wikipedia',
  },
  {
    year: '2026',
    title: 'Live the Change',
    text: 'The 18th edition, themed “Indian Maximalism”, runs 19–22 February with 40+ events.',
    source: 'srmist-event',
  },
];

/** On stage at MILAN'26, as reported by SRMIST. */
export const lineup2026 = {
  inaugurated: 'Sreeleela',
  performers: ['Mithoon', 'Santhosh Narayanan', 'Office Gaana', 'DJ Viola'],
  source: 'srmist-news',
};

/**
 * Festival domains. Descriptions paraphrase formats documented for past
 * editions; they are not a promise of the next edition's line-up.
 *
 * `category` links the domain to the events filter (null = no sample events).
 * `visual` overrides which poster style is shown (defaults to category).
 * `image` (optional) — path to an authorised photograph in /public; when set,
 * it replaces the illustrated poster in the hover reveal.
 */
export const domains = [
  {
    id: 'dance',
    name: 'Dance',
    note: 'Solo battles, group choreography and adapt-the-tune rounds that pack the main stage.',
    category: 'Dance',
  },
  {
    id: 'music',
    name: 'Music',
    note: 'Solo singing and instrumentals alongside rap battles, beatboxing, a cappella, band battles and jugalbandi.',
    category: 'Music',
  },
  {
    id: 'drama',
    name: 'Dramatics',
    note: 'The Colosseum domain — short films, script-writing and stage theatrics.',
    category: 'Drama',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    note: 'A student-designed runway that closes the festival with collections made on campus.',
    category: 'Fashion',
  },
  {
    id: 'literary',
    name: 'Literary',
    note: 'Debates, extempore and essay-writing — in English, Tamil and Telugu.',
    category: 'Literary',
  },
  {
    id: 'arts',
    name: 'Fine Arts',
    note: 'Road graffiti, wall painting, collage and poster-making with a social message.',
    category: 'Creative Arts',
  },
  {
    id: 'gaming',
    name: 'Gaming',
    note: 'Listed among the MILAN’26 categories on the official SRMIST page.',
    category: 'Technical',
  },
  {
    id: 'aero',
    name: 'Aeromodelling',
    note: 'Design-and-fly challenges for builders of their own craft.',
    category: 'Technical',
  },
  {
    id: 'funzone',
    name: 'Funzone',
    note: 'Formerly “Informals” — treasure hunts and games-for-everyone.',
    category: null,
    visual: 'Funzone',
  },
];

export const socialLinks = [
  {
    label: 'SRMIST MILAN on Instagram',
    handle: '@srmist_milan',
    url: 'https://www.instagram.com/srmist_milan',
  },
  {
    label: 'SRMIST DSA on Instagram',
    handle: '@srmist_dsa',
    url: 'https://www.instagram.com/srmist_dsa',
  },
];

export const contact = {
  label: 'SRMIST main line',
  phones: ['+91-44-27417000', '+91-44-27417777'],
  dsaPage: 'https://www.srmist.edu.in/directorate-of-student-affairs/',
};
