const fs = require('fs');

const generatePage = require('./src/page-template.js');

// const profileDataArgs = process.argv.slice(2, process.argv.length);

// const [name, github] = profileDataArgs;

// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw new Error (err);

//     console.log('Portfolio complete! Checkout index.html to see the output!');
// });



const inquirer = require('inquirer');
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter your name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username? (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub Username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an"About" section',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => confirmAbout
        }
    ]);
};

const promptProject = portfolioData => {
    // if there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
===============
Add a New Project
===============
`);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project? (Required)',
            validate: projectInput => {
                if (projectInput) {
                    return true;
                } else {
                    console.log('Please enter your project name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of your project (Required)',
            validate: descInput => {
                if (descInput) {
                    return true;
                } else {
                    console.log('Please enter a description of your project!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you code this project with? (Check all that apply)',
            choices: ['Javasript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub link to this project!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to add another project?',
            default: false
        }
    ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });
};
const mockData = {
    name: 'Satalia',
    github: 'Essennejaye',
    confirmAbout: true,
    about: 'I like to code, but I am a beginner.',
    projects: [
      {
        name: 'portfolio-generator',
        description: 'It generates a portfolio page.',
        languages: ['JavaScript', 'HTML', 'Node', 'ES6'],
        link: 'essennejaye/portfolio-generator',
        feature: true,
        confirmAddProject: true
      },
      {
        name: 'Taskinator',
        description: "It's a productivity app that makes a to do list.",
        languages: ['JavaScript','HTML', 'CSS', 'Bootstrap'],
        link: 'essennejaye/taskinator',
        feature: false,
        confirmAddProject: true
      },
      {
        name: 'Run Buddy',
        description: "It's an awesome fitness app.",
        languages: ['HTML', 'CSS', 'Bootstrap'],
        link: 'essennejaye/run-buddy',
        feature: true,
        confirmAddProject: false
      }
    ]
  }

// promptUser()
//     .then(promptProject)
//     .then(portfolioData => {
        const pageHTML = generatePage(mockData);

        fs.writeFile('index.html', pageHTML, err => {
            if (err) throw new Error (err);

            console.log('Portfolio complete! Checkout index.html to see the output!');
        });
    // });



