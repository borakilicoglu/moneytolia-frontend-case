# Moneytolia Frontend

A modern Angular-based dashboard application for managing marketing campaigns and financial operations.

## Overview

Moneytolia Frontend provides a comprehensive interface for creating, managing, and tracking marketing campaigns. The application features user authentication, campaign management, and a responsive dashboard interface.

## Features

- Secure user authentication
- Campaign creation and management
- Interactive dashboard
- Responsive design for all devices

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/borakilicoglu/moneytolia-frontend-case.git
   cd moneytolia-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Development

### Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building for Production

To build the project for production, run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. The production build optimizes your application for performance and speed.

## Testing

### Running Unit Tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

### Running End-to-End Tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Note: Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Project Structure

```
src/
├── app/
│   ├── dashboard/       # Dashboard components
│   ├── guards/          # Route guards
│   ├── services/        # Application services
│   └── ...
├── assets/              # Static assets
└── environments/        # Environment configurations
```

## Authentication

The application uses token-based authentication. For development, you can use:

- Username: admin
- Password: password123

## Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular Material](https://material.angular.io)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)

## License

[MIT License](LICENSE)
