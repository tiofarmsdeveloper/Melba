export interface Transaction {
  id: number;
  description: string;
  date: string;
  amount: number; // positive for earned, negative for spent
}

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
  transactions: Transaction[];
  identifier: string;
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
    avatar: 'https://api.dicebear.com/8.x/emoji/svg?seed=Alex',
    identifier: '210-843-775-807',
    transactions: [
      { id: 1, description: 'Dinner at Melba', date: '2024-07-20', amount: -150 },
      { id: 2, description: 'Promo Code: MELBA100', date: '2024-07-18', amount: 100 },
      { id: 3, description: 'Referral Bonus', date: '2024-07-15', amount: 50 },
      { id: 4, description: 'Lunch Special', date: '2024-07-12', amount: -75 },
      { id: 5, description: 'Welcome Credits', date: '2024-07-10', amount: 25 },
      { id: 6, description: 'Late Night Pizza', date: '2024-07-05', amount: -90 },
    ],
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
    avatar: 'https://api.dicebear.com/8.x/emoji/svg?seed=Admin',
    identifier: '001-002-003-004',
    transactions: [],
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
    avatar: 'https://api.dicebear.com/8.x/emoji/svg?seed=Sam',
    identifier: '332-912-445-819',
    transactions: [
      { id: 1, description: 'Welcome Credits', date: '2024-07-19', amount: 200 },
    ],
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
    avatar: 'https://api.dicebear.com/8.x/emoji/svg?seed=Jane',
    identifier: '483-194-227-511',
    transactions: [
      { id: 1, description: 'Dinner Party', date: '2024-07-21', amount: -450 },
      { id: 2, description: 'Tier Upgrade Bonus', date: '2024-07-20', amount: 500 },
    ],
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
    avatar: 'https://api.dicebear.com/8.x/emoji/svg?seed=Mike',
    identifier: '881-234-598-342',
    transactions: [
      { id: 1, description: 'Chef\'s Table Experience', date: '2024-07-22', amount: -1000 },
      { id: 2, description: 'Loyalty Anniversary', date: '2024-07-15', amount: 1000 },
    ],
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
    description: 'A curated selection of our finest wood-fired pizzas.',
    image: '/placeholder.svg',
    cost: 500,
  },
  {
    id: 2,
    title: 'Ginger Ale Flight',
    description: 'Explore a flight of house-made ginger ales.',
    image: '/placeholder.svg',
    cost: 250,
  },
  {
    id: 3,
    title: 'Signature Mocktail',
    description: 'Enjoy a tableside preparation of a signature mocktail.',
    image: '/placeholder.svg',
    cost: 350,
  },
  {
    id: 4,
    title: 'Dessert Selection',
    description: 'Your choice of any dessert from our daily menu.',
    image: '/placeholder.svg',
    cost: 400,
  },
];

export const promoCodes = [
  { code: 'MELBA100', credits: 100, used: false },
  { code: 'PIZZA50', credits: 50, used: false },
];