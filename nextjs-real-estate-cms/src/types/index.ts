export interface Property {
    _id: string;
    title: string;
    slug: { current: string };
    price: number;
    propertyType: string;
    status: string;
    location: {
      address?: string;
      city?: string;
      state?: string;
      zipCode?: string;
      country?: string;
    };
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    images: Array<{
      asset: {
        _ref: string;
        url?: string;
      };
      alt?: string;
    }>;
    description?: string;
    features?: string[];
    featured?: boolean;
    publishedAt: string;
  }
  
  export interface Post {
    _id: string;
    title: string;
    slug: { current: string };
    mainImage?: {
      asset: {
        _ref: string;
        url?: string;
      };
      alt?: string;
    };
    excerpt?: string;
    publishedAt: string;
    author?: {
      name: string;
      image?: {
        asset: {
          url?: string;
        };
      };
    };
  }
  