# Recommended set up

This is documenting how we set up the repo in readiness to leverage off cursor.

🔗 https://www.youtube.com/watch?v=2PjmPU07KNs&t=3s&ab_channel=AIJason

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
