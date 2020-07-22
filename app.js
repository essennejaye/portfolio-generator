// const fs = require('fs');

// const generatePage = require('./src/page-template.js');

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
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username?'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
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
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of your project (Required)'
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
            message: 'Enter the GitHub link to your project. (Required)'
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

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });



