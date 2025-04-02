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
  c.
