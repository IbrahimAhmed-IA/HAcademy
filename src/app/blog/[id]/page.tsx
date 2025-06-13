'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// This would typically come from a database or API
const blogPosts = {
  '1': {
    title: 'Understanding Macronutrients: A Complete Guide',
    content: `
      <p>Macronutrients are the nutrients that provide calories or energy. They are needed in large amounts to maintain body functions and carry out daily activities. The three main macronutrients are:</p>

      <h2>1. Proteins</h2>
      <p>Proteins are essential for building and repairing tissues, making enzymes and hormones, and supporting immune function. Good sources include:</p>
      <ul>
        <li>Lean meats</li>
        <li>Fish and seafood</li>
        <li>Eggs</li>
        <li>Legumes</li>
        <li>Dairy products</li>
      </ul>

      <h2>2. Carbohydrates</h2>
      <p>Carbohydrates are the body's main source of energy. They are classified into:</p>
      <ul>
        <li>Simple carbohydrates (sugars)</li>
        <li>Complex carbohydrates (starches and fiber)</li>
      </ul>

      <h2>3. Fats</h2>
      <p>Fats are crucial for hormone production, nutrient absorption, and brain health. They include:</p>
      <ul>
        <li>Monounsaturated fats</li>
        <li>Polyunsaturated fats</li>
        <li>Saturated fats</li>
        <li>Trans fats (to be avoided)</li>
      </ul>

      <h2>Balancing Macronutrients</h2>
      <p>The key to optimal nutrition is finding the right balance of macronutrients for your individual needs. This depends on factors such as:</p>
      <ul>
        <li>Age and gender</li>
        <li>Activity level</li>
        <li>Health goals</li>
        <li>Medical conditions</li>
      </ul>
    `,
    author: {
      name: 'Dr. Sarah Johnson',
      image: '/team/sarah.jpg',
      bio: 'Certified Nutrition Specialist with over 10 years of experience in sports nutrition and weight management.',
    },
    date: '2024-03-15',
    category: 'Nutrition Basics',
    image: '/blog/macronutrients.jpg',
    readTime: '8 min read',
    tags: ['Nutrition', 'Health', 'Diet', 'Wellness'],
  },
  // Add more blog posts here
};

export default function BlogPost() {
  const params = useParams();
  const post = blogPosts[params.id as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="btn btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-90" />
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-6">
              <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                {post.category}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif mb-6">{post.title}</h1>
            <div className="flex items-center justify-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-left">
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-white/80">{post.date} · {post.readTime}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] mb-12 rounded-2xl overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Author Bio */}
          <div className="bg-white rounded-2xl p-6 mb-12 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src={post.author.image}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{post.author.name}</h3>
                <p className="text-gray-600">{post.author.bio}</p>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <article
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Share Buttons */}
          <div className="mt-12 pt-8 border-t">
            <h3 className="font-bold mb-4">Share this article</h3>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'LinkedIn', 'Email'].map((platform) => (
                <button
                  key={platform}
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <span className="sr-only">Share on {platform}</span>
                  {/* Add platform icons here */}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="bg-gray-100 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Add related posts here */}
          </div>
        </div>
      </section>
    </main>
  );
} 