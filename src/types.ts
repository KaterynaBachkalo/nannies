export interface INanny {
  about: string;
  avatar_url: string;
  birthday: string;
  education: string;
  experience: string;
  kids_age: string;
  location: string;
  name: string;
  price_per_hour: number;
  rating: number;
  characters: string[];
  reviews: {
    comment: string;
    rating: number;
    reviewer: string;
  }[];
}
