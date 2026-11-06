/**
 * SAMPLE EVENT DATA
 *
 * These events are illustrative. They are inspired by the cultural domains
 * MILAN has run in past editions, but their names, schedules, venues and
 * rules are invented for this demonstration and are NOT official listings.
 * The UI labels them "Sample" everywhere they appear.
 *
 * Shape (every event has every field):
 * {
 *   id: string            unique, URL-safe slug — used in ?event=<id>
 *   title: string
 *   category: one of CATEGORIES (minus "All")
 *   tagline: string       one line for cards
 *   description: string   2–3 sentences for cards and search
 *   details: string[]     paragraphs for the detail view
 *   day: number           festival day (1–4)
 *   time: string          display time
 *   venue: string
 *   format: 'Solo' | 'Duo' | 'Team' | 'Solo / Team'
 *   teamSize: string
 *   duration: string
 *   rules: string[]
 *   keywords: string[]    extra search terms
 *   image?: string        optional photo path in /public; falls back to poster art
 * }
 */

export const CATEGORIES = [
  'All',
  'Dance',
  'Music',
  'Drama',
  'Fashion',
  'Creative Arts',
  'Literary',
  'Technical',
];

export const events = [
  {
    id: 'nritya-rising',
    title: 'Nritya Rising',
    category: 'Dance',
    tagline: 'Group choreography, any style, one stage.',
    description:
      'Crews of six to twenty bring classical, folk, contemporary or fusion sets to the main stage. Storytelling counts as much as synchronisation.',
    details: [
      'Nritya Rising is the big-stage group dance showcase. Bring any style — Bharatanatyam, Kuchipudi, Bhangra, contemporary, hip-hop or a fusion that blends them.',
      'Judges look at choreography, synchronisation, use of stage, costume and how clearly the set tells a story.',
    ],
    day: 2,
    time: '6:00 PM',
    venue: 'Main Stage (sample)',
    format: 'Team',
    teamSize: '6 – 20 members',
    duration: '8 minutes per crew',
    rules: [
      'Set length is 6–8 minutes including entry and exit.',
      'Tracks must be submitted in MP3 format before the event.',
      'No fire, liquids or loose powders on stage.',
    ],
    keywords: ['group dance', 'choreography', 'classical', 'folk', 'fusion', 'crew'],
  },
  {
    id: 'street-cypher',
    title: 'Street Cypher',
    category: 'Dance',
    tagline: 'One-on-one battles to tracks you’ve never heard.',
    description:
      'Solo dancers face off in knockout rounds to tracks picked live by the DJ. Freestyle only — no prepared routines.',
    details: [
      'Street Cypher is a knockout freestyle battle. The DJ chooses every track live, so adaptability is everything.',
      'Two dancers trade one-minute rounds and a panel picks who goes through, round by round, until one dancer is left.',
    ],
    day: 1,
    time: '4:30 PM',
    venue: 'Open-Air Arena (sample)',
    format: 'Solo',
    teamSize: 'Individual',
    duration: 'Knockout rounds, 1 min each',
    rules: [
      'Freestyle only — prepared choreography is penalised.',
      'Each round is one minute per dancer.',
      'Judges’ decisions are final.',
    ],
    keywords: ['battle', 'freestyle', 'hip-hop', 'breaking', 'popping', 'solo dance'],
  },
  {
    id: 'jugalbandi-jam',
    title: 'Jugalbandi Jam',
    category: 'Music',
    tagline: 'Two musicians, two traditions, one conversation.',
    description:
      'Duos pair instruments or voices from different traditions — Carnatic and jazz, tabla and beatbox — and improvise a call-and-response set.',
    details: [
      'In a jugalbandi, two performers trade phrases and answer each other. Here the pairing is the point: bring two instruments, voices or traditions that rarely share a stage.',
      'Sets are judged on musicality, improvisation and how well the two performers listen to each other.',
    ],
    day: 2,
    time: '11:00 AM',
    venue: 'Mini Hall (sample)',
    format: 'Duo',
    teamSize: '2 performers',
    duration: '10 minutes per duo',
    rules: [
      'At least half the set must be improvised.',
      'Backing tracks are not allowed.',
      'Basic stage mics and a keyboard are provided; bring your own instruments.',
    ],
    keywords: ['carnatic', 'hindustani', 'fusion', 'instrumental', 'duet', 'improvisation', 'tabla'],
  },
  {
    id: 'amplify-band-battle',
    title: 'Amplify: Battle of the Bands',
    category: 'Music',
    tagline: 'Original music, full volume.',
    description:
      'College bands play twenty-minute sets of original music. Rock, indie, metal, folk-fusion — the crowd and the jury both get a say.',
    details: [
      'Amplify is for bands writing their own material. Each band plays a 20-minute set; at least two songs must be originals.',
      'A jury scores tightness, originality and stage presence, and an audience vote counts towards the final result.',
    ],
    day: 3,
    time: '7:00 PM',
    venue: 'Main Stage (sample)',
    format: 'Team',
    teamSize: '3 – 7 members',
    duration: '20 minutes per band',
    rules: [
      'Minimum two original compositions per set.',
      'Drum kit and amplifiers are provided; bring your own pedals and guitars.',
      'Changeover time is 5 minutes.',
    ],
    keywords: ['band', 'rock', 'indie', 'metal', 'original', 'concert', 'live music'],
  },
  {
    id: 'rangmanch',
    title: 'Rangmanch',
    category: 'Drama',
    tagline: 'A stage play in under thirty minutes.',
    description:
      'Theatre groups stage an original or adapted short play in English, Tamil or Hindi. Minimal sets, maximum performance.',
    details: [
      'Rangmanch is the stage-play competition. Groups perform an original script or an adaptation in English, Tamil or Hindi.',
      'Sets and props are kept minimal on purpose — performance, direction and script carry the piece.',
    ],
    day: 3,
    time: '2:00 PM',
    venue: 'Auditorium (sample)',
    format: 'Team',
    teamSize: '4 – 15 members',
    duration: '25 minutes per group',
    rules: [
      'Performances must stay under 25 minutes including set-up.',
      'Scripts must be submitted for review in advance.',
      'Content must be suitable for a general audience.',
    ],
    keywords: ['theatre', 'play', 'acting', 'stage', 'tamil', 'hindi', 'script'],
  },
  {
    id: 'frame-24',
    title: 'Frame 24',
    category: 'Drama',
    tagline: 'Write, shoot and cut a short film in a day.',
    description:
      'Teams receive a theme and a prop at 10 AM and submit a finished short of up to five minutes 24 hours later. Phones are welcome.',
    details: [
      'Frame 24 is a 24-hour filmmaking challenge. The theme and a mandatory prop are revealed at the start; everything else — script, shoot, edit, sound — happens inside the window.',
      'Shortlisted films are screened on the final day.',
    ],
    day: 1,
    time: '10:00 AM (24 hrs)',
    venue: 'Campus-wide (sample)',
    format: 'Team',
    teamSize: '2 – 5 members',
    duration: '24 hours',
    rules: [
      'Final film must be 5 minutes or shorter.',
      'All footage must be shot during the 24-hour window.',
      'Only royalty-free or original music may be used.',
    ],
    keywords: ['short film', 'filmmaking', 'cinema', 'video', 'editing', 'film'],
  },
  {
    id: 'ramp-raga',
    title: 'Ramp Raga',
    category: 'Fashion',
    tagline: 'Student-designed collections on the runway.',
    description:
      'Teams design and walk a themed collection of six to ten looks. Craft, concept and choreography are judged together.',
    details: [
      'Ramp Raga is the fashion show. Each team builds a collection around a single concept and walks it as a choreographed sequence.',
      'Handloom, upcycled and craft-led collections are especially welcome in a year that celebrates Indian maximalism.',
    ],
    day: 4,
    time: '7:30 PM',
    venue: 'Main Stage (sample)',
    format: 'Team',
    teamSize: '8 – 16 members',
    duration: '10 minutes per team',
    rules: [
      'Collections must have 6–10 looks.',
      'A concept note is submitted with registration.',
      'Music and choreography are the team’s responsibility.',
    ],
    keywords: ['fashion show', 'runway', 'design', 'handloom', 'styling', 'costume'],
  },
  {
    id: 'kolam-and-chalk',
    title: 'Kolam & Chalk',
    category: 'Creative Arts',
    tagline: 'Street art on the campus roads.',
    description:
      'Artists get a stretch of road and a box of colour to turn a theme into large-format street art, blending kolam geometry with graffiti.',
    details: [
      'Kolam & Chalk turns campus roads into a gallery. Each team gets a marked plot and a theme announced on the day.',
      'Work is judged on concept, use of colour and how the piece reads from a distance.',
    ],
    day: 2,
    time: '7:00 AM',
    venue: 'Campus Main Road (sample)',
    format: 'Solo / Team',
    teamSize: '1 – 3 members',
    duration: '4 hours',
    rules: [
      'Only water-based paints and chalk are allowed.',
      'Work must stay inside the marked plot.',
      'Teams bring their own brushes; paints are provided.',
    ],
    keywords: ['rangoli', 'kolam', 'graffiti', 'painting', 'street art', 'mural', 'fine arts'],
  },
  {
    id: 'vaad-vivaad',
    title: 'Vaad-Vivaad',
    category: 'Literary',
    tagline: 'Parliamentary debate, three languages.',
    description:
      'Two-person teams argue motions on technology, ethics and the environment. Rounds run in English, Tamil and Telugu.',
    details: [
      'Vaad-Vivaad follows a parliamentary format. Motions are released 20 minutes before each round.',
      'Teams can compete in English, Tamil or Telugu brackets, each with its own judging panel.',
    ],
    day: 1,
    time: '2:00 PM',
    venue: 'Seminar Hall (sample)',
    format: 'Duo',
    teamSize: '2 speakers',
    duration: 'Preliminary rounds + finals',
    rules: [
      'Speeches are 6 minutes each, with points of information allowed.',
      'Electronic devices may not be used during preparation.',
      'Brackets: English, Tamil and Telugu.',
    ],
    keywords: ['debate', 'public speaking', 'tamil', 'telugu', 'english', 'motion', 'argument'],
  },
  {
    id: 'respawn-arena',
    title: 'Respawn Arena',
    category: 'Technical',
    tagline: 'A campus LAN tournament.',
    description:
      'Five-person squads compete in a bracketed tactical shooter tournament on campus machines, with finals cast live on a big screen.',
    details: [
      'Respawn Arena is a bracketed esports tournament played on campus machines over a local network.',
      'Group stages run through the day and the finals are cast live with commentary.',
    ],
    day: 2,
    time: '10:00 AM',
    venue: 'Computer Lab Block (sample)',
    format: 'Team',
    teamSize: '5 players + 1 substitute',
    duration: 'Full day',
    rules: [
      'Players must bring their own peripherals.',
      'Any form of cheating leads to team disqualification.',
      'Match settings are fixed by the organisers.',
    ],
    keywords: ['gaming', 'esports', 'lan', 'tournament', 'video games'],
  },
  {
    id: 'skyward',
    title: 'Skyward',
    category: 'Technical',
    tagline: 'Build it, then fly it.',
    description:
      'Teams design and build their own RC aircraft, then fly a set course with a payload drop. Points for precision and endurance.',
    details: [
      'Skyward is the aeromodelling challenge. Teams arrive with a craft they designed and built themselves.',
      'The flight round tests a set course, a payload drop and a clean landing.',
    ],
    day: 3,
    time: '8:00 AM',
    venue: 'Sports Ground (sample)',
    format: 'Team',
    teamSize: '2 – 4 members',
    duration: '3 hours',
    rules: [
      'Wingspan must not exceed 1.5 metres.',
      'Electric motors only.',
      'A safety inspection is required before flight.',
    ],
    keywords: ['aeromodelling', 'rc plane', 'drone', 'engineering', 'flying', 'aircraft'],
  },
];

/** Pure lookup — returns undefined when an id does not exist. */
export function getEventById(id, list = events) {
  if (!id) return undefined;
  return list.find((event) => event.id === id);
}
