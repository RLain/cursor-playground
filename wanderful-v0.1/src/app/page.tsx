import { Metadata } from 'next';
import BlogHomePage from '../components/blog/home-page';

export const metadata: Metadata = {
  title: 'Wanderful Hiking Blog',
  description: 'Explore hiking destinations, gear reviews, and trail tips',
};

export default function HomePage() {
  return <BlogHomePage />;
} 