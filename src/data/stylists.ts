export type ServiceCategory =
  | 'Cut'
  | 'Color'
  | 'Balayage'
  | 'Texture'
  | 'Treatment'
  | 'Style';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  durationMinutes: number;
  priceUsd: number;
}

export interface Stylist {
  id: string;
  name: string;
  title: string;
  bio: string;
  expertise: string[];
  services: Service[];
  yearsExperience: number;
  initials: string;
  accentColor: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface BookingRequest {
  stylistId: string;
  serviceId: string;
  date: string;
  timeSlotId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
}

export interface BookingConfirmation extends BookingRequest {
  confirmationCode: string;
  bookedAt: string;
}

export const MOCK_STYLISTS: Stylist[] = [
  {
    id: 'stylist-1',
    name: 'Jordan Ellis',
    title: 'Master Colorist',
    bio: 'Jordan brings 12 years of precision color work to every appointment. Specializing in lived-in balayage and dimensional brunette techniques, Jordan has trained extensively in Paris and New York and is known for color that moves beautifully in any light.',
    expertise: ['Balayage', 'Highlights', 'Color Correction', 'Brunette Specialist'],
    yearsExperience: 12,
    initials: 'JE',
    accentColor: '#C9922A',
    services: [
      {
        id: 's1-1',
        name: 'Balayage',
        category: 'Balayage',
        durationMinutes: 150,
        priceUsd: 220,
      },
      {
        id: 's1-2',
        name: 'Full Highlights',
        category: 'Color',
        durationMinutes: 120,
        priceUsd: 180,
      },
      {
        id: 's1-3',
        name: 'Color Correction',
        category: 'Color',
        durationMinutes: 240,
        priceUsd: 350,
      },
      {
        id: 's1-4',
        name: 'Gloss Treatment',
        category: 'Treatment',
        durationMinutes: 45,
        priceUsd: 85,
      },
    ],
  },
  {
    id: 'stylist-2',
    name: 'Sam Rivera',
    title: 'Precision Cut Specialist',
    bio: "Sam is obsessed with architecture — every cut is designed to work with your natural growth patterns and lifestyle. Known for transformative textured bobs and effortless layered cuts that look incredible on day 7, Sam's appointments are always booked in advance.",
    expertise: ['Textured Cuts', 'Bob Specialist', 'Dry Cutting', 'Fine Hair'],
    yearsExperience: 8,
    initials: 'SR',
    accentColor: '#B87333',
    services: [
      {
        id: 's2-1',
        name: 'Signature Cut + Style',
        category: 'Cut',
        durationMinutes: 75,
        priceUsd: 95,
      },
      {
        id: 's2-2',
        name: 'Dry Sculpt Cut',
        category: 'Cut',
        durationMinutes: 90,
        priceUsd: 120,
      },
      {
        id: 's2-3',
        name: 'Blowout + Style',
        category: 'Style',
        durationMinutes: 45,
        priceUsd: 65,
      },
    ],
  },
  {
    id: 'stylist-3',
    name: 'Alex Chen',
    title: 'Texture & Treatment Expert',
    bio: 'Alex specializes in the science of hair health. From Japanese straightening to keratin smoothing and deep conditioning rebuilding treatments, Alex restores damaged hair and helps clients achieve low-maintenance texture goals that last.',
    expertise: ['Keratin', 'Japanese Straightening', 'Bond Repair', 'Curly Hair'],
    yearsExperience: 9,
    initials: 'AC',
    accentColor: '#D4A853',
    services: [
      {
        id: 's3-1',
        name: 'Keratin Smoothing',
        category: 'Texture',
        durationMinutes: 180,
        priceUsd: 280,
      },
      {
        id: 's3-2',
        name: 'Japanese Straightening',
        category: 'Texture',
        durationMinutes: 300,
        priceUsd: 480,
      },
      {
        id: 's3-3',
        name: 'Bond Repair Treatment',
        category: 'Treatment',
        durationMinutes: 60,
        priceUsd: 110,
      },
      {
        id: 's3-4',
        name: 'Curl Definition Cut',
        category: 'Cut',
        durationMinutes: 90,
        priceUsd: 115,
      },
    ],
  },
  {
    id: 'stylist-4',
    name: 'Morgan Blake',
    title: 'Blonding Specialist',
    bio: 'Morgan lives for the perfect blonde — whether you want cool platinum, warm honey, or a sun-kissed money piece. With a chemistry background and 6 years of dedicated blonding work, Morgan delivers luminous dimension without compromise.',
    expertise: ['Platinum', 'Toning', 'Money Piece', 'Blonde Maintenance'],
    yearsExperience: 6,
    initials: 'MB',
    accentColor: '#E6B85C',
    services: [
      {
        id: 's4-1',
        name: 'Full Bleach + Tone',
        category: 'Color',
        durationMinutes: 180,
        priceUsd: 260,
      },
      {
        id: 's4-2',
        name: 'Root Touch-Up + Tone',
        category: 'Color',
        durationMinutes: 120,
        priceUsd: 160,
      },
      {
        id: 's4-3',
        name: 'Money Piece',
        category: 'Color',
        durationMinutes: 90,
        priceUsd: 140,
      },
      {
        id: 's4-4',
        name: 'Toner Only',
        category: 'Color',
        durationMinutes: 45,
        priceUsd: 75,
      },
    ],
  },
  {
    id: 'stylist-5',
    name: 'Taylor Okafor',
    title: 'Lived-In & Editorial Stylist',
    bio: "Taylor's aesthetic is modern, directional, and always wearable. Equal parts editorial sensibility and salon pragmatism, Taylor consults deeply before every appointment and brings a unique blend of European training and contemporary technique to natural and textured hair.",
    expertise: ['Editorial', 'Natural Hair', 'Protective Styles', 'Creative Cuts'],
    yearsExperience: 10,
    initials: 'TO',
    accentColor: '#C9922A',
    services: [
      {
        id: 's5-1',
        name: 'Creative Cut + Style',
        category: 'Cut',
        durationMinutes: 90,
        priceUsd: 130,
      },
      {
        id: 's5-2',
        name: 'Natural Hair Consultation + Style',
        category: 'Style',
        durationMinutes: 90,
        priceUsd: 110,
      },
      {
        id: 's5-3',
        name: 'Protective Style',
        category: 'Style',
        durationMinutes: 120,
        priceUsd: 150,
      },
    ],
  },
];

const TIME_SLOTS = [
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
  '3:00 PM',
  '3:30 PM',
  '4:00 PM',
  '4:30 PM',
  '5:00 PM',
];

export function generateTimeSlots(date: string): TimeSlot[] {
  const seed = date
    .split('-')
    .reduce((acc, n) => acc + parseInt(n, 10), 0);
  return TIME_SLOTS.map((time, i) => ({
    id: `slot-${i}`,
    time,
    available: (seed + i) % 3 !== 0,
  }));
}

export function getNextDays(count: number): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateLong(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function generateConfirmationCode(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `HH-${num}`;
}
