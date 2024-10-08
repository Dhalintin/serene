# Serene Backend

## Overview

The Serene Backend is the server-side application powering the Serene app, which aims to create a safe environment for mental well-being. This backend handles user authentication, community features,
therapist appointment scheduling, and resource management. It is built using Node.js, Express, and MongoDB.

## Table of Contents

-   [Installation](#installation)
-   [Configuration](#configuration)
-   [API Endpoints](#api-endpoints)
    -   [Authentication](#authentication)
    -   [Users](#users)
    -   [Communities](#communities)
    -   [Messages](#messages)
    -   [Therapists](#therapists)
    -   [Resources](#resources)
-   [Error Handling](#error-handling)
-   [Testing](#testing)
-   [Deployment](#deployment)
-   [Contributing](#contributing)
-   [License](#license)

## Installation

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 14 or above)
-   [MongoDB](https://www.mongodb.com/) (version 4.0 or above)

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/dhalintin/serene.git
    cd serene
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up the environment variables. Create a `.env` file in the root directory and add the following:

    ```bash
    JWT_KEY=your_jwt_secret
    MONGO_URL=your_mongo_connection_string
    PORT=5000
    ```

4. Start the server:
    ```bash
    npm run start
    ```

## Configuration

The backend relies on environment variables for configuration. Below are the key variables:

-   `JWT_KEY`: Secret key for JWT token generation.
-   `MONGO_URL`: MongoDB connection string.
-   `PORT`: The port on which the server runs (default is 5000).

## API Endpoints

### Authentication

-   **POST /api/v1/user/login**
    -   Login/Registers a new user.
    -   Request Body: `walletid`,
    -   Response: JSON containing the user details and JWT token.

### Communities

-   **POST /api/v1/community/create**

    -   Creates a new community.
    -   Request Body: `name`, `description`, `topics`, `rules`
    -   Response: JSON containing community details.

-   **POST /api/v1/community/join**

    -   Join a community.
    -   Request Body: `userId`, `communityId`
    -   Response: JSON containing community details.

-   **POST /api/v1/community/leave**
    -   Leave a community.
    -   Request Body: `userId`, `communityId`
    -   Response: JSON containing community details.
-   **DELETE /api/v1/community/delete/id**
    -   Delete a community.
    -   Request Body: `communityId`.
    -   Response: JSON containing community details.

### Messages

-   **POST /api/v1/community/message**
    -   Sends a message within a community.
    -   Request Body: `communityId`, `userId`, `message`
    -   Response: JSON containing the message details.

### Therapists

-   **GET /api/v1/therapists**

    -   Retrieves a list of available therapists.
    -   Response: JSON containing a list of therapists.

-   **POST /api/v1/appointments**
    -   Books an appointment with a therapist.
    -   Request Body: `therapistId`, `userId`, `date`, `time`
    -   Response: JSON confirming the appointment.

### Articles

-   **POST /api/v1/article**

    -   Creates an Article
    -   Request Body: `title`, `body`, `author`
    -   Response: JSON Message/Error of the Creation

-   **PATCH /api/v1/article/id**

    -   Updates an Article
    -   Request Body: `title`, `body`, `author`
    -   Response: JSON Message/Error of the Update

-   **GET /api/v1/article/id**

    -   Retrieves an Article
    -   Response: JSON containing the Article details.

-   **DELETE /api/v1/article/id**

    -   Deletes an Article
    -   Response: JSON Message/Error of the Deletion

-   **GET /api/v1/article**
    -   Retrieves a list of Articles
    -   Response: JSON containing a list of Articles

### CATEGORY

-   **GET /api/v1/category**

    -   Retrieves a list of Categories
    -   Response: JSON containing a list of Categories

-   **POST /api/v1/category**

    -   Creates a Category
    -   Request Body: `name`, `desc`
    -   Response: JSON Message/Error of the Creation

-   **PATCH /api/v1/category/id**

    -   Updates a Category
    -   Request Body: `name`, `desc`
    -   Response: JSON Message/Error of the Update

-   **DELETE /api/v1/category/id**

    -   Deletes a Category
    -   Response: JSON Message/Error of the Deletion

-   **GET /api/v1/category/id**
    -   Retrieves a Category
    -   Response: JSON containing the Category details.

### VIDEO

-   **POST /api/v1/video**

    -   Creates a Video
    -   Request Body: `title`, `link`, `desc`, `cat_id`
    -   Response: JSON Message/Error of the Creation
    -   Note: `cat_id` is the ID of the Category the Video belongs to
    -   Note: `link` is the link to the video on YouTube or Vimeo
    -   Note: `desc` is a short description of the video
    -   Note: `title` is the title of the video

-   **GET /api/v1/video**

    -   Retrieves a list of Videos
    -   Response: JSON containing a list of Videos

-   **GET /api/v1/video/id**

    -   Retrieves a Video
    -   Response: JSON containing the Video details.

-   **PATCH /api/v1/video/id**

    -   Updates a Video
    -   Request Body: `title`, `link`, `desc`
    -   Response: JSON Message/Error of the Update

-   **DELETE /api/v1/video/id**
    -   Deletes a Video
    -   Response: JSON Message/Error of the Deletion

### Resources

-   **GET /api/resources**
    -   Retrieves a list of community-specific resources.
    -   Response: JSON containing a list of resources.

## Error Handling

The backend uses a consistent error handling strategy to ensure meaningful error messages are returned. Errors are handled using Express middleware and return JSON responses with appropriate HTTP
status codes.

## Testing

Testing is handled using Jest and Supertest. To run tests, use the following command:

```bash
npm test
```

## Deployment

To deploy the Serene backend, ensure that all environment variables are correctly set up on the server. The backend can be deployed using services like Heroku, AWS, or DigitalOcean.

Example deployment using Heroku:

```bash
heroku create serene-backend
git push heroku master
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License.

---

This README provides a structured and comprehensive guide for developers who may work on or use your backend application.
