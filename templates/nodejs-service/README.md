# nodejs-service Starter Kit

The nodejs-service starter kit provides a convenient setup for quickly starting a NodeJS project. It includes the
following tools and configurations:

## Included Tools

* Jest - Test runner for executing tests and generating test reports.
* ESLint - Code linting tool to ensure consistent code style and identify potential errors.
* Prettier - Code formatting tool to automatically format your code.
* Swagger - API documentation tool to generate interactive API documentation.
* Environment variables - Configuration parameters for your project.

## Installation

### Using the CLI

To install the nodejs-service starter kit using the Command Line Interface (CLI), follow these steps:

1. Open your command line interface.
2. Choose whether to use NPM or Yarn as your package manager.
3. Run the following command to start the interactive mode and see the list of available starter kits:

```sh
npm create cms-quick-start
```

```sh
yarn create cms-quick-start
```

1. Follow the prompts to select the nodejs-service starter kit and name your new project. 
2. Once the project creation is complete, navigate to your project directory:

```sh
 cd your-project-directory
```

* Create a .env file and copy the contents of .env.example into it.
* Create a swagger.json file and copy the contents of swagger-example.json into it.
* To start the development server run:

```sh
npm run dev 
```

* Open your browser to http://localhost:3001/api-docs/ and http://localhost:3001/api-specs/ to see the API documentation
  with the existing endpoints.

