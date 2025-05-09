# cursor-playground

This is a multi-facetated project that includes:
- Playing around and testing cursor IDE
- Upskilling on React, Next.js and Shadcn/UI: using Angular at work and want to get exposure to new frameworks.

This is the start of the wanderful-life.co.uk build hiking 🥾

The V0.1 plan is to leverage off [Sanity Studio](https://www.sanity.io/) which is a CMS. Get the blog up and running, then consider if building out a custom CMS would be fun.

# Running local

- $ cd into /studio-wanderful and run npm run dev. This spins up http://localhost:3333/
- $ cd into /wanderful-v0.1 and run npm run dev. This spins up http://localhost:3000/

# Important learnings

• Make sure cursor properly sets up secrets in an .env file and doesn't added any secrets directly into thre code base....see point 11 warning below.
• Set up a .cursorrules files - [Cursor Rule Maker](https://cursorrules.agnt.one/chat) & [Awesome Cursor Rules](https://github.com/PatrickJS/awesome-cursorrules)
• The critical tailwind config was not set up properly. Explicate this better in the instructions.md

# Recommended set up

This is documenting how we set up the repo in readiness to leverage off cursor.

🔗 [Best Cursor Workflow that no one talks about...
](https://www.youtube.com/watch?v=2PjmPU07KNs&t=3s&ab_channel=AIJason)

1. We created the instructions.md file and populated with the PRD
2. Then we spun up the boilerplate $ npx shadcn@latest init  
3. Next we created the /instructions dir and moved instruction.md into it
4. $ cursor {{projectName}} -> $ cursor wanderful-v0.1
5. Next we added an .env.local file
6. Then we ran $ npx shadcn@latest add as with the previous command this didn't add the components. 
As part of this select the components you wish to add, they then get generated into a new /components dir
7. Next we ran $ brew install tree, this then allows us to run the $ tree command and add this to our instructions.md `# Current file structure` section.
   - Noting that $ tree will returning _everything_ which is uncessary so we can rather use $  tree -L 2 -I 'node_modules|.git'
   - This goes two levels down using -L
   - And ignores node_modules and git using -I
8. Then Jason recommends copying your draft instructions.md into Claude o1 model and doing a series of prompts:
  a. 'How should I structure my project files (try to create as few files as possible)
  b. Help me add details to the original PRD that give clear alignment to developers who will implement the project
     i. Don't create actual code, just return the PRD
     ii. Include the file structure in the doc
     iii. Include all documentations provided with example code as these are important context
  c. I then copied the output into instructions-final.md and reviewed
9. I then asked Claude "Is there anything that you think is missing or could be improved?" and it identified some gaps, I then followed up with
   ```md
   Please add the following:

    A testing section that uses Jasmine for unit testing with core functionality tested and ensuring each test expects a specific outcome, with no tests overlapping the outcomes.

    A error handling section to define a global error handler

    CI/CD section utilising Semaphore and best practises 

    Include that the blog must be responsive

    Questions:

    Q1: Do we need authentication? My understanding is the backend is managed on Sanity and the blog simply renders the data?
   ```
10. We are now ready to get Composer to help with building out the application. Jason then gets Composer to build _each section_ at a time....e.g. Build Section 1.1....let Composer run, check, then build section
1.2 etc. 
  a. Click CMD + I to open the chat.
  b. Type in 'Let's build a hiking blog integrated with Sanity Studio based on @instructions-final.md 

      Let's first build '1. Admin Features (via Sanity Studio) -> 1.1 Create a Blog Post''
🤖 _At this point Cursor started generating files in the codebase_
11. I then needed to set up /studio-wanderful as a separate repo to run Sanity Studio locally on localhost:3333

⚠️ Cursor did not set up an .env file automatically inside /studio-wanderful (nor did I set one up) so it added the studio secrets directly into the code base. This required prompting it to set up env configuration....

12. Continued prompting
'Let's continue build a hiking blog integrated with Sanity Studio based on @instructions-final.md 

Let's now build '### 2. Public User Features (Read-Only)

#### 2.1 View Blog Posts'. 

13. At this point I 
  a. Added in the `.cursorrules` file as wanted to explicate more expectation for cursor to leverage off.
  b. Tweaked the project structure on instructions-final.md to ensure that .env.local and environment.ts are included for sensitive cred management.

14. I then tried to get cursor to continue building out section 2, but unfortunately the pro plan had expired. _Significantly_ reduced experienced on the free plan with regular quote issues. I can only use gpt-4o in Edit mode on the free plan.

15. Next I discovered I didn't have a CSS and tailwind set up so needed to 
- create a /src/global.css file
- install using npm, 
- create a tailwind.config.js file and 
- add the module.exports to the postcss.config.js.

16. Next I realised at somepoint the shadcn components had disappeared....so I reinstalled under wanderful-v0.1/src/components/ui

At this point I asked Cursor to improve the UI using shadcn, it proposed the following:
- Add a search/filter bar above the posts
- Switch from pagination to infinite scroll
- Show post metadata (date, author, excerpt) on the cards
- Add skeleton loading placeholders instead of the spinner
- Adjust grid spacing or card hover animations

This is what the BlogHomePage looked like prior to any updates:
![point 17](/wanderful-v0.1/readme-assets/point%2016%20progress.png)

--> --> --> Reminder to self - add a design system to this repo to manage colouring etc

__________-

# Q&A

1) What (blog) Means

GPT: It’s a “route group” in Next.js App Router. The parentheses indicate that the folder won’t affect the URL path — it’s purely an organizational tool.

For example:
/app/(blog)/posts/page.tsx → /posts
/app/(blog)/page.tsx → /

Even though the files live under (blog), the URLs will not include /blog.

2) 🧪 App Router (/app directory) — Introduced in Next.js 13+
The modern routing system with powerful features, better structure, and improved developer experience.

File-Based Routing + Enhanced Structure:
app/page.tsx → /
app/about/page.tsx → /about

You can colocate components, loading states, and error boundaries.




