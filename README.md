# Project Overview

This project is a minimal full-stack application designed to scrape product information from an e-commerce webpage and display it in a user-friendly interface. The application utilizes React with TypeScript and CSS for the frontend, and NestJS with Prisma, MySQL, and Puppeteer for the backend. The purpose of this project is to demonstrate my capabilities in both front-end and back-end development, showcasing technical strengths, decision-making processes, and practical problem-solving approaches.


## Technology Stack

### Frontend:

- React with TypeScript
- CSS for styling
- RTK Query for data fetching and caching

### Backend:

- NestJS framework
- Prisma ORM for database interactions
- MySQL database
- Puppeteer for web scraping

## Installation and Setup

### Prerequisites

- Node.js
- npm or yarn
- MySQL
- @nestjs/cli

### Backend Setup

## Installation and Setup

### Backend Setup

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Set up the MySQL database and update the .env file with your database credentials:**

    ```env
    DATABASE_URL=mysql://user:password@localhost:3306/mydatabase
    ```

    ```env
    PORT=5000
    ```

3. **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```

4. **Start the backend server:**

    ```bash
    npm run start:dev
    ```

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the frontend development server:**

    ```bash
    npm start
    ```

## Usage

1. Open the application in your browser at http://localhost:3000.
2. Enter a product URL from Amazon and submit it for scraping.
3. View the listed products, search, and filter through them as needed, all the products from db can be seen below.
4. If the product data is older than one week, it will be refetched and updated asynchronously.

## Design Choices and Assumptions

### Frameworks and Libraries:

- Chose React with TypeScript for its strong typing capabilities and widespread use in frontend development.
- Utilized RTK Query for efficient data fetching and caching, simplifying state management related to server data.
- Opted for NestJS due to its modular architecture and ease of use in building scalable server-side applications.
- Prisma was selected as the ORM for its type safety, ease of setup, and seamless integration with NestJS.
- Puppeteer was chosen for web scraping due to its ability to handle dynamic content rendering by JavaScript.

### Database:

- Used MySQL for its reliability and support for relational data, which suits the schema for products and categories.

### Asynchronous Operations:

- Implemented asynchronous scraping and data updating to ensure a smooth user experience without blocking the UI.

## Testing

Testing was not implemented in this project due to time constraints.

## Incomplete Aspects and Future Steps

- **Pagination:**
  Implement pagination for the product list to handle a large number of products efficiently.
  
- **Error Handling:**
  Enhance error handling in both frontend and backend for a more robust application.
  
- **Testing:**
    Testing was not implemented in this project due to time constraints. 

- **Authentication:**
  Add user authentication and authorization to secure the endpoints and user data.
  
- **Deployment:**
  Prepare Docker configurations for containerized deployment and set up CI/CD pipelines for automated testing and deployment.
