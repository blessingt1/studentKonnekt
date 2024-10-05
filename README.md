# HMS Backend API

Student Konnekt Human MoveMent Science Management System Backend API is a Node.js application designed for managing user authentication, assignments, feedback, and submissions in a Human Movement Science Management System.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/blessingt1/studentKonnekt.git
   cd hms-backend
   ```

2. **Install dependencies:**
   Make sure you have [Node.js](https://nodejs.org/) installed. Then run:
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```
   JWT_KEY=secret
   SWAGGER_URL=http://localhost:8000/api-docs
   ```

4. **Run the application:**
   Use the following command to start the server:
   ```bash
   cd hms-backend
   npm start
   ```

   The server will run on `http://localhost:8000`.

## Usage

### Authentication
- **Register a new user:**
  - **Endpoint:** `POST /users/register`
  - **Request Body:**
    ```json
    {
      "first_name": "John",
      "last_name": "Doe",
      "email": "john.doe@example.com",
      "password": "P@ssw0rd123",
      "role": 2 // 0: ADMIN, 1: LECTURER, 2: STUDENT
    }
    ```

- **User login:**
  - **Endpoint:** `POST /users/login`
  - **Request Body:**
    ```json
    {
      "email": "john.doe@example.com",
      "password": "P@ssw0rd123"
    }
    ```

### Assignments
- **Get all assignments:**
  - **Endpoint:** `GET /assignments`

- **Create a new assignment:**
  - **Endpoint:** `POST /assignments`
  - **Request Body:**
    ```json
    {
      "title": "HMS",
      "description": "Complete the frontend",
      "subject": "IT DEVS",
      "createdBy": "userId",
      "due_date": "2024-10-16"
    }
    ```

### Feedback
- **Create feedback for an assignment:**
  - **Endpoint:** `POST /feedback`
  - **Request Body:**
    ```json
    {
      "submissionId": "submissionId",
      "userId": "userId",
      "feedbackText": "Good job!",
      "mark": 85
    }
    ```

### Submissions
- **Submit a selected video:**
  - **Endpoint:** `POST /submissions/selected`
  - **Request Body:** (multipart/form-data)
    - `assignmentId`: string
    - `userId`: string
    - `video`: file

## API Endpoints
Refer to the [Swagger documentation](http://localhost:8000/api-docs) for detailed API endpoints and their specifications.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.
