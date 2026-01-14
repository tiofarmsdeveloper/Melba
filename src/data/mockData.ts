export interface Transaction {
  id: number;
  description: string;
  date: string;
  amount: number;
}

export interface Voucher {
  id: string;
  title: string;
  code: string;
  expiry: string;
  used: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'reward' | 'tier';
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
  vouchers: Voucher[];
  notifications: Notification[];
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
    vouchers: [],
    notifications: [
      { id: '1', title: 'Welcome to Privé', message: 'You have ascended to the Privé tier. Enjoy your new benefits.', date: '2024-07-20', read: false, type: 'tier' },
      { id: '2', title: 'New Reward Available', message: 'The Artisanal Pizza Pairing is now available for redemption.', date: '2024-07-18', read: true, type: 'reward' }
    ],
    transactions: [
      { id: 1, description: 'Dinner at Melba', date: '2024-07-20', amount: -150 },
      { id: 2, description: 'Promo Code: MELBA100', date: '2024-07-18', amount: 100 },
      { id: 3, description: 'Referral Bonus', date: '2024-07-15', amount: 50 },
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
    vouchers: [],
    notifications: [],
    transactions: [],
  },
];

export const tiers = {
  Member: {
    name: 'Member',
    threshold: 0,
    benefits: ['Priority waitlist', 'Early access to public events'],
  },
  Privé: {
    name: 'Privé',
    threshold: 1000,
    benefits: [
      'Priority reservations',
      'Complimentary welcome mocktail',
      'Seating preference requests',
      'Privé-only events',
    ],
  },
  'Black Circle': {
    name: 'Black Circle',
    threshold: 5000,
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
  { id: 1, title: 'Artisanal Pizza Pairing', description: 'A curated selection of our finest wood-fired pizzas.', image: '/placeholder.svg', cost: 500 },
  { id: 2, title: 'Ginger Ale Flight', description: 'Explore a flight of house-made ginger ales.', image: '/placeholder.svg', cost: 250 },
  { id: 3, title: 'Signature Mocktail', description: 'Enjoy a tableside preparation of a signature mocktail.', image: '/placeholder.svg', cost: 350 },
];

export const promoCodes = [
  { code: 'MELBA100', credits: 100, used: false },
  { code: 'PIZZA50', credits: 50, used: false },
];