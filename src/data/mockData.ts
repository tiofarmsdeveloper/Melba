export interface User {
  id: number;
  username: string;
  password?: string;
  role: 'user' | 'admin';
  name: string;
  tier: 'Member' | 'Privé' | 'Black Circle';
  credits: number;
  leaderboardUsername: string;
  avatar: string;
}

export let users: User[] = [
  {
    id: 1,
    username: 'user',
    password: 'user',
    role: 'user',
    name: 'Alex Doe',
    tier: 'Privé',
    credits: 1250,
    leaderboardUsername: 'Pizza Connoisseur',
    avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Alex',
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin',
    role: 'admin',
    name: 'Admin',
    tier: 'Black Circle',
    credits: 9999,
    leaderboardUsername: 'The Don',
    avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Admin',
  },
  {
    id: 3,
    username: 'member',
    password: 'password',
    role: 'user',
    name: 'Sam Smith',
    tier: 'Member',
    credits: 200,
    leaderboardUsername: 'Crust Crusader',
    avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Sam',
  },
  {
    id: 4,
    username: 'jane',
    password: 'password',
    role: 'user',
    name: 'Jane Roe',
    tier: 'Privé',
    credits: 2100,
    leaderboardUsername: 'Ginger Ale Guru',
    avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Jane',
  },
  {
    id: 5,
    username: 'mike',
    password: 'password',
    role: 'user',
    name: 'Mike Milligan',
    tier: 'Black Circle',
    credits: 5400,
    leaderboardUsername: 'Mocktail Maestro',
    avatar: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Mike',
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

export const promoCodes = [
  { code: 'MELBA100', credits: 100, used: false },
  { code: 'PIZZA50', credits: 50, used: false },
];