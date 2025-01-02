export interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  spicyLevel?: 0 | 1 | 2 | 3;
  isVegetarian: boolean;
  allergens?: string[];
  quantity?: number;
}