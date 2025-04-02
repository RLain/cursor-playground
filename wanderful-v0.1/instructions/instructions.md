# Project Overview 
You are a software engineer, and want to build a hiking blog, where an administrator can create, update, publish and delete posts, and viewers can see a read only version
of the posts. The administrator must be able to see a dashboard showing post engagement and top peforming posts.

Your plan is to use NextJs 15, shadcn, tailwind, Lucide icons

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
@sanity/client
Upstash Redis (@upstash/redis)
@shadcn/ui
lucide-react
framer-motion
@vercel/analytics
umami
@upstash/ratelimit
next-seo


# Current file structure
- 
- 