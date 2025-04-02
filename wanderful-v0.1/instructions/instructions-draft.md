# Project Overview 
You are a software engineer, and want to build a hiking blog, where an administrator can create, update, publish and delete posts, and viewers can see a read only version
of the posts. The administrator must be able to see a dashboard showing post engagement and top peforming posts.

Your plan is to use Typescript, NextJs 15, shadcn, tailwind, Lucide icons

# Core functionalities
These are features available to the blog administrator via Sanity Studio.

✅ 1.1 Create a Blog Post
Admins can create a new blog post inside Sanity Studio.

Fields include:

Title

Slug (Auto-generated or custom)

Body (Rich text editor for markdown or block content)

Featured Image (Sanity’s image upload & optimization)

Categories (Hiking, Gear, Trails, Tips, etc.)

Tags (e.g., "mountains", "backpacking")

Published Status (Draft or Published)

Date Published

✅ 1.2 Edit a Blog Post
Admins can update any existing post via Sanity Studio.

Modifications include:

Updating the title, content, categories, and tags.

Replacing or modifying the featured image.

Changing the published status (Draft <--> Published).

Updating the SEO metadata (if using next-seo).

✅ 1.3 Delete a Blog Post
Admins can permanently delete posts in Sanity Studio.

Soft delete option (move to "archived" instead of deleting permanently).

✅ 1.4 Publish/Unpublish Blog Posts
Posts can be marked as:

Draft → Only visible in Sanity Studio.

Published → Visible on the live site.

Admins can toggle between Draft and Published.

👀 2. Public User Features (Read-Only)
These features are for blog visitors who can only view content.

✅ 2.1 View Blog Posts
Users can browse all published blog posts.

Posts include:

Title, content, featured image, categories, and tags.

SEO metadata (if using next-seo for search ranking).

Estimated read time.

Share buttons (optional).

✅ 2.2 View Single Blog Post
Clicking a post opens the full post page.

Page includes:

Full content.

Featured image.

Related posts (based on categories/tags).

Author details (optional).

Published date.

✅ 2.3 Filter & Search Blog Posts
Search: Users can search by keywords.

Filter by Category: Hiking, Gear Reviews, Trails, etc.

Sort by Date: Newest, oldest, most popular.

Tag System: Users can click tags to view related posts.

📊 3. Analytics & Engagement
✅ 3.1 Blog Engagement Dashboard (Admin)
Displays engagement metrics:

Total page views (using @vercel/analytics or umami).

Most popular posts (based on views).

Average read time per post.

Traffic sources (referrals, search, direct visits).

# Doc (e.g. include packages)
The project must use the following packages:
@sanity/client (https://www.sanity.io/docs/reference/api/sanity)
@upstash/redis
@shadcn/ui
lucide-react
framer-motion
@vercel/analytics
umami
@upstash/ratelimit
next-seo
dotenv

## Documentation for Sanity
To interact with Sanity for fetching, publishing, updating, and deleting posts, you'll typically use the @sanity/client package. Here's a basic skeleton to get you started with these operations:
1. Setup Sanity Client
First, ensure you have the @sanity/client package installed. You can install it using npm or yarn:
```bash
npm install @sanity/client
```
2. Initialize the Sanity Client
Create a file, for example, sanityClient.js, to initialize the Sanity client:
```js
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'yourProjectId', // replace with your project ID
  dataset: 'yourDataset', // replace with your dataset name
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-10-01', // use a date string
});

export default client;
```
3. Fetch Posts
To fetch posts, you can use a GROQ query:
```js
// lib/fetchPosts.js
import client from './sanityClient';

export const fetchPosts = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug,
    body,
    mainImage,
    categories[]->title,
    tags,
    publishedAt
  }`;

  const posts = await client.fetch(query);
  return posts;
};
```
4. Publish a Post
To publish a post, you need to create or update a document:
```js
// lib/publishPost.js
import client from './sanityClient';

export const publishPost = async (post) => {
  const result = await client.createOrReplace({
    _type: 'post',
    ...post,
  });

  return result;
};
```
5. Update a Post
To update a post, you can use the patch method:
```js
// lib/updatePost.js
import client from './sanityClient';

export const updatePost = async (postId, updates) => {
  const result = await client
    .patch(postId)
    .set(updates)
    .commit();

  return result;
};
```
6. Delete a Post
To delete a post, use the delete method:
```js
// lib/deletePost.js
import client from './sanityClient';

export const deletePost = async (postId) => {
  const result = await client.delete(postId);
  return result;
};
```


# Current file structure
wanderful-v0.1
├── README.md
├── app
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   └── ui
├── components.json
├── eslint.config.mjs
├── instructions
│   ├── instructions.md
│   └── setup_README.md
├── lib
│   └── utils.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
└── tsconfig.json
