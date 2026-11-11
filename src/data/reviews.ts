export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  product: string;
  text: string;
}

/**
 * SAMPLE CONTENT. Replace with real customer reviews before launch.
 */
export const reviews: Review[] = [
  {
    id: "r-1",
    name: "Mariam S.",
    city: "Cairo",
    rating: 5,
    product: "Nile Tote",
    text: "The leather smells and feels like real leather, and the stitching is even all the way round. I carry it to work every day.",
  },
  {
    id: "r-2",
    name: "Omar K.",
    city: "Giza",
    rating: 5,
    product: "Siwa Bifold Wallet",
    text: "Slim, solid and it already looks better after a month in my pocket. Delivery was quick and the packaging was careful.",
  },
  {
    id: "r-3",
    name: "Nour A.",
    city: "Mansoura",
    rating: 4,
    product: "Zamalek Crossbody",
    text: "Just the right size for my phone and keys. I asked about a different strap length on WhatsApp and got an answer the same day.",
  },
];
