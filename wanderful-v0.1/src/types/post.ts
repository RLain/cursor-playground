import { PortableTextBlock } from "next-sanity";

export interface Post {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    body: PortableTextBlock[];
    mainImage: {
      asset: {
        _ref: string;
        _type: string;
      };
      alt?: string;
    };
    tags: string[];
    publishedAt: string;
  }
  