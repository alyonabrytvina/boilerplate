# nestjs-service Starter Kit

The nestjs-service starter kit provides a convenient setup for quickly starting a NestJS project. It includes the
following tools and configurations:

## Included Tools

* Jest - Test runner for executing tests and generating test reports.
* ESLint - Code linting tool to ensure consistent code style and identify potential errors.
* Prettier - Code formatting tool to automatically format your code.
* Swagger - API documentation tool to generate interactive API documentation.
* Environment variables - Configuration parameters for your project.

## Installation

### Using the CLI

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
* Edit a swagger configuration src/config folder

### Start NestJS Server

##### Run Nest Server in Development mode:

```sh
npm run start
```

###### watch mode

```sh
npm run start:dev
```

##### Run Nest Server in Production mode:

```sh
npm run start:prod
```

###

RESTful API documentation available with Swagger.

* Open your browser to http://localhost:3000/api to see the API documentation
  with the existing endpoints.

