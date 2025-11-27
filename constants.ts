import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "The Royal Navy Slim Fit",
    price: 38500,
    category: "Business",
    image: "/suit1.jpg",
    description: "A classic navy suit tailored for the modern professional. Crafted from breathable Italian wool, this suit offers both comfort and commanding presence.",
    features: ["100% Italian Wool", "Slim Fit Cut", "Double Vent", "Notch Lapel"],
    sizes: ["38R", "40R", "42R", "44R", "46L"],
    colors: ["Navy Blue", "Charcoal"],
    rating: 4.8,
    reviews: 124
  },
  {
    id: 2,
    name: "Charcoal Executive Series",
    price: 45000,
    category: "Business",
    image: "/suit2.jpg",
    description: "The definitive power suit. The charcoal hue exudes authority, while the silk lining ensures all-day comfort during high-stakes meetings.",
    features: ["Merino Wool Blend", "Modern Fit", "Single Breasted", "Wrinkle Resistant"],
    sizes: ["38R", "40R", "42R", "44L"],
    colors: ["Charcoal Grey", "Black"],
    rating: 4.9,
    reviews: 89
  },
  {
    id: 3,
    name: "Tuxedo Royale Black",
    price: 78000,
    category: "Wedding",
    image: "/suit3.jpeg",
    description: "For the moments that matter. This satin-lapel tuxedo is the epitome of evening elegance.",
    features: ["Premium Wool", "Satin Peak Lapel", "Tailored Fit", "Matching Bowtie Included"],
    sizes: ["38R", "40R", "42R", "44R"],
    colors: ["Black", "Midnight Blue"],
    rating: 5.0,
    reviews: 45
  },
  {
    id: 4,
    name: "The Havana Linen Beige",
    price: 32500,
    category: "Casual",
    image: "/suit4.jpeg",
    description: "Perfect for summer weddings or garden parties. Lightweight linen keeps you cool while looking effortlessly sharp.",
    features: ["100% Linen", "Unstructured Jacket", "Patch Pockets", "Breathable"],
    sizes: ["38R", "40R", "42R", "44R"],
    colors: ["Beige", "Light Blue"],
    rating: 4.6,
    reviews: 67
  },
  {
    id: 5,
    name: "Double Breasted Pinstripe",
    price: 54600,
    category: "Vintage",
    image: "/suit5.jpeg",
    description: "A nod to the roaring twenties. This bold pinstripe suit makes a statement wherever you go.",
    features: ["Wool Flannel", "Peak Lapel", "Double Breasted", "High-Waisted Trousers"],
    sizes: ["40R", "42R", "44R"],
    colors: ["Navy Pinstripe", "Grey Pinstripe"],
    rating: 4.7,
    reviews: 32
  },
  {
    id: 6,
    name: "Velvet Dinner Jacket",
    price: 49400,
    category: "Evening",
    image: "/suit6.jpeg",
    description: "Luxurious velvet jacket paired with classic black trousers. Stand out at the gala.",
    features: ["Cotton Velvet", "Shawl Collar", "Slim Fit", "Trousers Included"],
    sizes: ["38R", "40R", "42R"],
    colors: ["Burgundy", "Deep Green", "Black"],
    rating: 4.9,
    reviews: 15
  }
];

export const REVIEWS = [
  { id: 1, user: "James O.", text: "The quality of the fabric is unmatched. Delivery to Nairobi was surprisingly fast.", rating: 5 },
  { id: 2, user: "Michael K.", text: "Bought the Tuxedo for my wedding. Fits like a glove. Highly recommend.", rating: 5 },
  { id: 3, user: "David W.", text: "Great customer service. Helped me pick the right size.", rating: 4 },
];