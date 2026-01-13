export interface User {
  id: number;
  username: string;
  password?: string;
  role: 'user' | 'admin';
  name: string;
  tier: 'Member' | 'Privé' | 'Black Circle';
  credits: number;
}

export const users: User[] = [
  {
    id: 1,
    username: 'user',
    password: 'user',
    role: 'user',
    name: 'Alex Doe',
    tier: 'Privé',
    credits: 1250,
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin',
    role: 'admin',
    name: 'Admin',
    tier: 'Black Circle',
    credits: 9999,
  },
  {
    id: 3,
    username: 'member',
    password: 'password',
    role: 'user',
    name: 'Sam Smith',
    tier: 'Member',
    credits: 200,
  },
];

export const tiers = {
  Member: {
    name: 'Member',
    benefits: ['Priority waitlist', 'Early access to public events'],
  },
  Privé: {
    name: 'Privé',
    benefits: [
      'Priority reservations',
      'Complimentary welcome mocktail',
      'Seating preference requests',
      'Privé-only events',
    ],
  },
  'Black Circle': {
    name: 'Black Circle',
    benefits: [
      'Guaranteed reservations (even peak)',
      'Off-menu mocktails',
      'Chef table access',
      'Concierge-style chat',
      'Invitation-only tastings',
    ],
  },
};

export const rewards = [
  {
    id: 1,
    title: 'Artisanal Pizza Pairing',
    description: 'A curated selection of our finest wood-fired pizzas paired with non-alcoholic beverages.',
    image: '/placeholder.svg',
  },
  {
    id: 2,
    title: 'Ginger Ale Flight',
    description: 'Explore a flight of house-made ginger ales, from spicy to sweet.',
    image: '/placeholder.svg',
  },
  {
    id: 3,
    title: 'Signature Mocktail Experience',
    description: 'Enjoy a tableside preparation of one of our signature mocktails.',
    image: '/placeholder.svg',
  },
];