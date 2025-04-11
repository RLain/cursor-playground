# Wanderful Hiking Blog - Project Requirements Document

## Project Overview 
You are a software engineer building a hiking blog where an administrator can create, update, publish, and delete posts, while viewers can see a read-only version of the posts. The administrator must be able to see a dashboard showing post engagement and top-performing posts.

The project will utilize: 
- TypeScript
- Next.js 15 (App Router)
- shadcn/ui components
- Tailwind CSS
- Lucide icons
- Sanity CMS
- Upstash Redis for caching and rate limiting
- Vercel Analytics & Umami for tracking

## Project Structure
```
wanderful-v0.1
├── .env.local
├── .env.example
├── README.md
├── next.config.js
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── middleware.ts
├── public
│   ├── favicon.ico
│   └── images/
│       └── logo.svg
├── src
│   ├── actions/
│   │   ├── posts.ts
│   │   └── search.ts
│   ├── app
│   │   ├── (admin)
│   │   │   ├── analytics/page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── error.tsx
│   │   │   └── page.tsx
│   │   ├── (blog)
│   │   │   ├── categories/[category]/page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── error.tsx
│   │   │   ├── page.tsx
│   │   │   ├── posts/[slug]/page.tsx
│   │   │   └── tags/[tag]/page.tsx
│   │   ├── api/
│   │   │   ├── posts/route.ts
│   │   │   ├── revalidate/route.ts  // For Sanity webhooks
│   │   │   └── search/route.ts
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── globals.css
│   │   └── layout.tsx
│   ├── components
│   │   ├── admin/
│   │   ├── blog/
│   │   ├── layout/
│   │   │   ├── footer.tsx
│   │   │   ├── header.tsx
│   │   │   ├── navigation.tsx
│   │   │   └── theme-toggle.tsx
│   │   ├── shared/
│   │   │   ├── portable-text.tsx  // For Sanity content
│   │   │   └── seo.tsx
│   │   └── ui/
│   ├── config/
│   │   ├── environment.ts
│   │   └── site.ts
│   ├── constants/
│   │   ├── navigation.ts
│   │   └── settings.ts
│   ├── hooks/
│   │   ├── use-preview.ts
│   │   └── use-media-query.ts
│   ├── lib/
│   │   ├── analytics/
│   │   │   ├── umami.ts
│   │   │   └── vercel.ts
│   │   ├── redis/
│   │   │   ├── client.ts
│   │   │   └── rate-limit.ts
│   │   ├── sanity/
│   │   │   ├── client.ts
│   │   │   ├── config.ts
│   │   │   ├── image.ts
│   │   │   └── queries.ts
│   │   └── utils/
│   │       ├── date-format.ts
│   │       ├── image-utils.ts
│   │       └── read-time.ts
│   ├── providers/
│   │   ├── theme-provider.tsx
│   │   └── preview-provider.tsx
│   ├── stores/
│   ├── styles/
│   │   └── animations.css
│   └── types/
│       ├── analytics.ts
│       ├── env.d.ts
│       ├── post.ts
│       └── sanity.ts
```

## Functional Requirements

### 1. Admin Features (via Sanity Studio)

For this section we must build the API integration with Sanity Studio to fetch and manage our post data.

#### 1.1 Create a Blog Post
Admins can create a new blog post inside Sanity Studio with the following fields:

- **Title** (String, required): The post headline
- **Slug** (String, required): URL-friendly identifier, auto-generated from title but customizable
- **Body** (Block content, required): Rich text editor supporting markdown with the following features:
  - Basic formatting (bold, italic, etc.)
  - Headers (H1-H6)
  - Lists (ordered, unordered)
  - Images with captions
  - Code blocks with syntax highlighting
  - Embedded content (maps for trail locations)
- **Featured Image** (Image, required): 
  - Minimum dimensions: 1200×800px
  - Support for alt text and captions
  - Automatic responsive image generation
- **Categories** (Reference, required): Select from predefined hiking categories:
  - Hiking
  - Gear
  - Trails
  - Tips
  - Safety
  - Wildlife
- **Tags** (Array of strings): Free-form tags for additional categorization (e.g., "mountains", "backpacking")
- **Published Status** (Boolean, required): Draft or Published
- **Date Published** (Date, required): When the post should appear as published
- **SEO Fields**:
  - Meta Title (default to post title if empty)
  - Meta Description
  - OG Image (default to featured image if empty)

#### 1.2 Edit a Blog Post
Admins can update any existing post with the ability to:

- Modify any field from above
- Preview changes before publishing
- See revision history of the post
- See a side-by-side comparison of changes
- Update SEO metadata independently of post content

#### 1.3 Delete a Blog Post
Admins can manage the lifecycle of posts:

- **Soft Delete**: Move to "archived" status (hidden from site but retrievable)
- **Permanent Delete**: Complete removal from the database
- **Confirmation Dialog**: Prevent accidental deletion
- **Bulk Delete**: Option to delete multiple posts at once

#### 1.4 Publish/Unpublish Blog Posts
Admins control the visibility of content:

- **Draft Mode**: Only visible in Sanity Studio for editing
- **Published Mode**: Visible on the live site
- **Scheduled Publishing**: Set future publish dates
- **Preview Mode**: View how the post will appear on the site before publishing

### 2. Public User Features (Read-Only)

#### 2.1 View Blog Posts
Users can browse published blog posts with:

- **Grid/List View**: Toggle between display options
- **Pagination**: 9 posts per page by default
- **Visual Indicators**:
  - Estimated read time
  - Category tags with color coding
  - Publication date
  - Featured post highlighting
- **SEO Optimization**: Proper metadata for search engines
- **Share Options**: Social media sharing buttons for each post

#### 2.2 View Single Blog Post
Full post page features:

- **Hero Image**: Responsive featured image display
- **Typography**: Optimized reading experience with proper spacing and font sizing
- **Rich Media Support**: Embedded images, videos, and maps
- **Author Section**: Optional author bio and image
- **Related Posts**: 3-4 related posts based on categories/tags
- **Navigation**: Previous/next post navigation
- **Reading Progress Bar**: Visual indicator of reading progress
- **Estimated Read Time**: Displayed prominently
- **Table of Contents**: For longer posts (optional, generated from headings)

#### 2.3 Filter & Search Blog Posts
Robust content discovery:

- **Search Functionality**:
  - Keyword-based search across titles, content, and tags
  - Autocomplete suggestions
  - Search results highlighting matched terms
- **Category Filtering**:
  - Dedicated category pages
  - Visual category cards on the homepage
- **Tag System**:
  - Tag clouds or lists
  - Clickable tags that filter posts
- **Sorting Options**:
  - Date (newest/oldest)
  - Popularity (most viewed)
  - Read time (shortest/longest)
- **Combined Filters**: Ability to use multiple filters simultaneously

### 3. Analytics & Engagement

#### 3.1 Blog Engagement Dashboard (Admin)
Comprehensive analytics view:

- **Overview Metrics**:
  - Total page views
  - Unique visitors
  - Average session duration
  - Bounce rate
- **Post Performance**:
  - Top 10 most viewed posts
  - Posts with highest engagement
  - Trending posts (recent growth in traffic)
- **Time-based Analytics**:
  - Daily/weekly/monthly view options
  - Traffic comparison periods
- **Traffic Sources**:
  - Referral breakdown
  - Search engine traffic
  - Social media sources
  - Direct visits
- **User Behavior**:
  - Average read time per post
  - Scroll depth metrics
  - Click heatmaps (if supported by analytics package)
- **Exportable Reports**: Generate CSV/PDF reports of analytics data

## Technical Implementation Details

### Required Packages
- `@sanity/client`: For interacting with Sanity CMS
- `@upstash/redis`: For caching and performance optimization
- `@shadcn/ui`: For UI components
- `lucide-react`: For icons
- `framer-motion`: For animations and transitions
- `@vercel/analytics`: For basic analytics
- `umami`: For privacy-focused analytics
- `@upstash/ratelimit`: For API rate limiting
- `next-seo`: For SEO optimization
- `jasmine`: For unit testing
- `jasmine-spec-reporter`: For better test output formatting

### Sanity Implementation

The project will use Sanity Studio for content management with the following implementation details:

#### Sanity Client Setup
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

#### Fetching Posts
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

#### Publishing Posts
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

#### Updating Posts
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

#### Deleting Posts
```js
// lib/deletePost.js
import client from './sanityClient';

export const deletePost = async (postId) => {
  const result = await client.delete(postId);
  return result;
};
```

### Testing Strategy

#### Unit Testing with Jasmine

The project will use Jasmine for unit testing to ensure code quality and prevent regressions.

##### Testing Structure
- Each test file should correspond to a source file being tested
- Tests should be organized in a parallel structure to the source code
- Example: `lib/utils/read-time.ts` → `tests/unit/utils/read-time.spec.ts`

##### Test Requirements
1. **Component Tests**:
   - Test each React component in isolation
   - Mock all external dependencies and API calls
   - Test both default and edge case behaviors
   - Verify component rendering, prop handling, and state changes

2. **Utility Function Tests**:
   - Each utility function must have corresponding tests
   - Test expected outputs for valid inputs
   - Test error handling for invalid inputs
   - Test edge cases (empty arrays, null values, etc.)

3. **API Route Tests**:
   - Test response formats and status codes
   - Test error handling
   - Mock Sanity client responses

##### Test Coverage Requirements
- Minimum 80% code coverage for all utility functions
- Minimum 70% code coverage for components
- 100% coverage for critical functions (e.g., data fetching, post formatting)

##### Test Implementation Guidelines
- Each test should only test one specific behavior or outcome
- Use descriptive test names that explain the expected behavior
- Follow the Arrange-Act-Assert pattern
- Avoid test interdependencies
- Use beforeEach and afterEach for common setup/teardown

Example test structure:
```typescript
// tests/unit/utils/read-time.spec.ts
describe('readTime', () => {
  it('should return 1 min for text with fewer than 200 words', () => {
    // Arrange
    const text = 'This is a short sample text.';
    
    // Act
    const result = readTime(text);
    
    // Assert
    expect(result).toBe(1);
  });

  it('should calculate correct read time for longer text', () => {
    // Arrange
    const text = /* 1000 word text */;
    
    // Act
    const result = readTime(text);
    
    // Assert
    expect(result).toBe(5); // Assuming 200 words per minute
  });

  it('should handle empty strings', () => {
    // Arrange
    const text = '';
    
    // Act
    const result = readTime(text);
    
    // Assert
    expect(result).toBe(0);
  });
});
```

### Error Handling Strategy

The project will implement a comprehensive error handling strategy to ensure a good user experience even when errors occur.

#### Global Error Handling

1. **Error Boundary Components**:
   - Create a global ErrorBoundary component to catch rendering errors
   - Implement page-specific error boundaries for critical sections
   - Show user-friendly error messages instead of crashing the application

2. **API Error Handling**:
   - Standardize error response format for all API routes
   - Implement consistent error status codes
   - Log detailed errors on the server but provide simplified messages to clients

3. **Error Logging**:
   - Set up client-side error tracking (potentially using Sentry)
   - Include contextual information in error logs (user agent, page, action)
   - Configure severity levels for different types of errors

4. **User-facing Error Components**:
   - Design reusable error message components
   - Create specific error pages for common HTTP status codes (404, 500)
   - Include helpful actions for users (refresh, return home, etc.)

#### Implementation Example:

```typescript
// lib/errors/errorHandler.ts
export const handleApiError = (error: unknown, context: string) => {
  // Log the error with context
  console.error(`Error in ${context}:`, error);
  
  // Determine the appropriate response
  if (error instanceof SanityError) {
    return {
      status: 503,
      message: 'Content service temporarily unavailable',
      code: 'SANITY_ERROR'
    };
  }
  
  if (error instanceof ValidationError) {
    return {
      status: 400,
      message: error.message,
      code: 'VALIDATION_ERROR'
    };
  }
  
  // Default error response
  return {
    status: 500,
    message: 'An unexpected error occurred',
    code: 'INTERNAL_ERROR'
  };
};
```

### CI/CD Pipeline using Semaphore

The project will implement a robust CI/CD pipeline using Semaphore to ensure code quality and reliable deployments.

#### CI Pipeline Configuration

1. **Build and Lint**:
   - Trigger on all pull requests and merges to main
   - Install dependencies
   - Run ESLint and TypeScript type checking
   - Build the Next.js application

2. **Testing**:
   - Run all Jasmine unit tests
   - Generate and store test coverage reports
   - Fail the build if coverage thresholds are not met
   - Run accessibility checks using axe-core

3. **Performance Checks**:
   - Run Lighthouse CI to measure performance metrics
   - Fail the build if scores fall below thresholds
   - Compare performance against baseline (previous build)

#### CD Pipeline Configuration

1. **Staging Deployment**:
   - Automatically deploy to staging environment after successful CI on main branch
   - Run smoke tests against staging environment
   - Notify team of successful deployment

2. **Production Deployment**:
   - Manual promotion from staging to production
   - Run pre-deployment checks (database migrations, etc.)
   - Deploy to production using blue-green deployment strategy
   - Run post-deployment verification tests

#### Best Practices

1. **Branch Protection**:
   - Require passing CI checks before merging to main
   - Require code reviews for all PRs
   - Prevent force pushing to protected branches

2. **Environment Management**:
   - Use separate environment configurations (dev, staging, production)
   - Store environment-specific variables in Semaphore secrets
   - Use feature flags for controlled feature rollouts

3. **Caching Strategy**:
   - Cache npm dependencies between builds
   - Cache Next.js build output when possible

4. **Monitoring and Alerts**:
   - Set up alerts for failed builds and deployments
   - Monitor deployment health after production releases
   - Configure automatic rollback for failed deployments

Example Semaphore configuration:
```yaml
# .semaphore/semaphore.yml
version: v1.0
name: Wanderful Blog Pipeline
agent:
  machine:
    type: e1-standard-2
    os_image: ubuntu2004

blocks:
  - name: "Install dependencies"
    task:
      jobs:
        - name: npm install
          commands:
            - checkout
            - cache restore node-modules-$SEMAPHORE_GIT_BRANCH
            - npm ci
            - cache store node-modules-$SEMAPHORE_GIT_BRANCH node_modules

  - name: "Lint and type check"
    task:
      jobs:
        - name: lint
          commands:
            - checkout
            - cache restore node-modules-$SEMAPHORE_GIT_BRANCH
            - npm run lint
            - npm run typecheck

  - name: "Tests"
    task:
      jobs:
        - name: Unit tests
          commands:
            - checkout
            - cache restore node-modules-$SEMAPHORE_GIT_BRANCH
            - npm test -- --coverage
            - npm run test:coverage:check

  - name: "Build"
    task:
      jobs:
        - name: Next.js build
          commands:
            - checkout
            - cache restore node-modules-$SEMAPHORE_GIT_BRANCH
            - npm run build

promotions:
  - name: Deploy to staging
    pipeline_file: deploy-staging.yml
    auto_promote:
      when: branch = 'main' AND result = 'passed'
```

### Responsive Design Requirements

The blog must be fully responsive across all device sizes to ensure a consistent user experience. This is a critical requirement for the project.

#### Breakpoint Strategy

- **Mobile First**: Design and develop for mobile devices first, then enhance for larger screens
- **Core Breakpoints**:
  - Small (mobile): Up to 640px
  - Medium (tablet): 641px to 1024px
  - Large (desktop): 1025px and above
- **Additional Breakpoints**:
  - X-Small: Up to 480px for very small devices
  - X-Large: 1280px and above for wide screens

#### Responsive Implementation Requirements

1. **Layout Adaptations**:
   - Single column layout on mobile
   - Two column layout on tablet
   - Three column grid for post listings on desktop
   - Proper whitespace and margins adapted to screen size

2. **Navigation**:
   - Hamburger menu on mobile with slide-out navigation
   - Horizontal navigation on tablet and desktop
   - Sticky header that minimizes on scroll for all devices

3. **Typography**:
   - Readable font sizes across all devices
   - Minimum 16px base font size on mobile
   - Proportionally scaled headings using responsive units (rem)

4. **Images**:
   - Responsive images using srcset or Next.js Image component
   - Different aspect ratios on different devices if needed
   - Optimize image loading performance (lazy loading, etc.)

5. **Testing Requirements**:
   - Test on actual devices, not just browser resizing
   - Test on iOS Safari and Android Chrome at minimum
   - Test with different pixel densities (1x, 2x, 3x)

### Performance Considerations

- **Image Optimization**: Use Sanity's built-in image transformation API for responsive images
- **Caching Strategy**: Implement Redis caching for frequently accessed content
- **Incremental Static Regeneration (ISR)**: Use Next.js ISR for optimal performance and freshness
- **Code Splitting**: Ensure components are properly code-split for faster page loads
- **SEO Optimization**: Implement structured data for rich snippets in search results

### Security Considerations

- **API Rate Limiting**: Implement rate limiting on all API endpoints using Upstash
- **Input Validation**: Validate all inputs on both client and server side
- **CORS Policies**: Set appropriate CORS policies for API endpoints
- **Environment Variables**: Store all sensitive information in .env files (not committed to version control)


## Design Principles

- **Accessibility**: Ensure WCAG 2.1 AA compliance
- **Responsive Design**: Optimize for all device sizes
- **Performance First**: Target Lighthouse score of 90+ on all metrics
- **Progressive Enhancement**: Ensure core functionality works without JavaScript
- **Brand Consistency**: Follow established brand guidelines for colors, typography, and imagery

## Additional Implementation Notes

- Use Next.js API routes for any required server-side logic
- Implement proper error handling and loading states
- Consider implementing dark/light mode toggle using Tailwind's dark mode
- Use TypeScript interfaces for all data models
- Follow strict ESLint rules for code quality