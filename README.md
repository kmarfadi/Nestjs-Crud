# CRUDAYA - Simple CRUD API - 'To Do List'

A simple, scalable, and well-structured CRUD (Create, Read, Update, Delete) API built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/). This project provides a basic foundation for managing "entries" with a title and description.

## Features

-   **NestJS Framework**: A progressive Node.js framework for building efficient and scalable server-side applications.
-   **Prisma ORM**: A next-generation ORM for Node.js and TypeScript.
-   **PostgreSQL**: A powerful, open-source object-relational database system.
-   **Clean Architecture**: A well-organized and scalable project structure.
-   **Comprehensive Testing**: Includes unit tests and end-to-end (e2e) tests.
-   **DTOs**: Data Transfer Objects for request and response validation.

## Project Structure

The project follows a clean and scalable structure, with a clear separation of concerns:

```
crudaya/
  ├── src/
  │   ├── app.module.ts
  │   ├── main.ts
  │   ├── prisma/
  │   │   ├── prisma.service.ts
  │   │   └── prisma.module.ts
  │   └── entries/
  │       ├── entries.controller.ts
  │       ├── entries.service.ts
  │       ├── entries.module.ts
  │       ├── dto/
  │       ├── __tests__/
  │       └── entries.entity.ts
  ├── test/
  ├── prisma/
  └── ...
```

## Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [npm](https://www.npmjs.com/)
-   [PostgreSQL](https://www.postgresql.org/)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/kmarfadi/Nestjs-Crud.git
    cd crudaya
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up the environment:**

    Create a `.env` file in the root directory and add your database connection URL:

    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

4.  **Run Prisma migrations:**

    ```bash
    npx prisma migrate dev
    ```

## Running the Application

-   **Development mode:**

    ```bash
    npm run start:dev
    ```

-   **Production mode:**

    ```bash
    npm run build
    npm run start:prod
    ```

## Running Tests

-   **Unit tests:**

    ```bash
    npm run test
    ```

-   **End-to-end (e2e) tests:**

    ```bash
    npm run test:e2e
    ```

## API Endpoints

| Method | Path             | Description                  |
| ------ | ---------------- | ---------------------------- |
| `POST` | `/entries`       | Create a new entry           |
| `GET`  | `/entries`       | Get all entries              |
| `GET`  | `/entries/:id`   | Get a single entry by ID     |
| `PATCH`| `/entries/:id`   | Update an entry by ID        |
| `DELETE`| `/entries/:id`  | Delete an entry by ID        |

## License

This project is unlicensed.
