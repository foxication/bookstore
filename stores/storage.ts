export interface UserLocal {
  id: number;
  name: string;
  email: string;
  password_hash: string;
}

export interface Book {
  // Base
  id: number;
  title: string;
  author: string;

  // Information
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  is_discontinued: boolean;
  created_at: Date;
  updated_at: Date;
  categories: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export const local_storage_category: Category[] = [
  {
    id: 1,
    name: 'Science Fiction',
    slug: 'science',
    description:
      'Science fiction (abbreviated SF or sci-fi with varying punctuation and capitalization) is a broad genre of fiction that often involves speculations based on current or future science or technology. Science fiction is found in books, art, television, films, games, theatre, and other media. In organizational or marketing contexts, science fiction can be synonymous with the broader definition of speculative fiction, encompassing creative works incorporating imaginative elements not found in contemporary reality; this includes fantasy, horror and related genres.\n\nAlthough the two genres are often conflated as science fiction/fantasy, science fiction differs from fantasy in that, within the context of the story, its imaginary elements are largely possible within scientifically established or scientifically postulated laws of nature (though some elements in a story might still be pure imaginative speculation). Exploring the consequences of such differences is the traditional purpose of science fiction, making it a "literature of ideas". Science fantasy is largely based on writing entertainingly and rationally about alternate possibilities in settings that are contrary to known reality.',
  },
  {
    id: 2,
    name: 'Fantasy',
    slug: 'fantasy',
    description:
      'Fantasy is a genre that uses magic and other supernatural forms as a primary element of plot, theme, and/or setting. Fantasy is generally distinguished from science fiction and horror by the expectation that it steers clear of technological and macabre themes, respectively, though there is a great deal of overlap between the three (collectively known as speculative fiction or science fiction/fantasy)\n\nIn its broadest sense, fantasy comprises works by many writers, artists, filmmakers, and musicians, from ancient myths and legends to many recent works embraced by a wide audience today, including young adults, most of whom are represented by the works below.',
  },
  {
    id: 3,
    name: 'Space',
    slug: 'space',
    description:
      '"Space" may refer to stories (usually science fiction) which are set in outer space or it may refer to non-fiction about outer space (especially sciences such as astronomy).',
  },
];

export const local_storage_books: Book[] = [
  {
    id: 1,
    title: 'Dune',
    author: 'Frank Herbert',
    description:
      'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the “spice” melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for...\n\nWhen House Atreides is betrayed, the destruction of Paul’s family will set the boy on a journey toward a destiny greater than he could ever have imagined. And as he evolves into the mysterious man known as Muad’Dib, he will bring to fruition humankind’s most ancient and unattainable dream.',
    price: 20.3,
    image_url: '/covers/dune.png',
    stock_quantity: 242,
    is_discontinued: false,
    created_at: new Date(),
    updated_at: new Date(),
    categories: ['science', 'fantasy'],
  },
  {
    id: 2,
    title: 'Fahrenheit 451',
    author: 'Ray Bradbury',
    description:
      'Sixty years after its original publication, Ray Bradbury’s internationally acclaimed novel Fahrenheit 451 stands as a classic of world literature set in a bleak, dystopian future. Today its message has grown more relevant than ever before.\n\nGuy Montag is a fireman. His job is to destroy the most illegal of commodities, the printed book, along with the houses in which they are hidden. Montag never questions the destruction and ruin his actions produce, returning each day to his bland life and wife, Mildred, who spends all day with her television “family.” But when he meets an eccentric young neighbor, Clarisse, who introduces him to a past where people didn’t live in fear and to a present where one sees the world through the ideas in books instead of the mindless chatter of television, Montag begins to question everything he has ever known.',
    price: 16.2,
    image_url: '/covers/fahrenheit.png',
    stock_quantity: 320,
    is_discontinued: false,
    created_at: new Date(),
    updated_at: new Date(),
    categories: ['science', 'fantasy'],
  },
  {
    id: 3,
    title: 'The Martian',
    author: 'Andy Weir',
    description: '',
    price: 15.0,
    image_url: '/covers/the-martian.png',
    stock_quantity: 23,
    is_discontinued: false,
    created_at: new Date(),
    updated_at: new Date(),
    categories: ['science', 'space'],
  },
  {
    id: 4,
    title: 'Do Androids Dream of Electric Sheep?',
    author: 'Philip K. Dick',
    description: '',
    price: 40.2,
    image_url: '/covers/blade-runner.png',
    stock_quantity: 42,
    is_discontinued: false,
    created_at: new Date(),
    updated_at: new Date(),
    categories: ['science'],
  },
  {
    id: 5,
    title: 'All Systems Red',
    author: 'Martha Wells',
    description: '',
    price: 10.4,
    image_url: '/covers/all-system-red.png',
    stock_quantity: 90,
    is_discontinued: false,
    created_at: new Date(),
    updated_at: new Date(),
    categories: ['science', 'fantasy', 'space'],
  },
  {
    id: 6,
    title: 'I, Robot',
    author: 'Isaac Asimov',
    description: '',
    price: 18.5,
    image_url: '/covers/i-robot.png',
    stock_quantity: 820,
    is_discontinued: false,
    created_at: new Date(),
    updated_at: new Date(),
    categories: ['science'],
  },
];

export const local_storage_users: UserLocal[] = [];
