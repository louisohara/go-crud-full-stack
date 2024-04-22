# My Application

This application is a simple CRUD User management app. The backend is built in Golang, and the frontend is built in Next.js (TypeScript). PostgreSQL is used for the database. The application is packaged and deployed using Docker.

## Prerequisites
- Docker must be installed on your machine ([Download Docker](https://www.docker.com/get-started))
  
## Installation and Usage

To run the application locally, follow these steps:

1. Clone the GitHub repository:
git clone <[repository-url](https://github.com/louisohara/go-crud-full-stack/)>

2. Navigate to the root directory of the cloned repository:
cd go-crud-full-stack

3. Build the Docker images and start the containers using Docker Compose:
docker-compose up --build

This command will read the `docker-compose.yaml` file, build the Docker images specified for the `nextapp` and `goapp` services using the Dockerfiles located in the `frontend` and `backend` directories respectively, and then start the containers for the frontend, backend, and database services.


This command will build and start the containers defined in the `docker-compose.yaml` file.

5. Once the containers are up and running, you can access the application at:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8080](http://localhost:8080)

## Features

- CRUD operations for managing users and associated files.
- Backend API endpoints for user management.
- Frontend interface for interacting with user data.
- PostgreSQL database for storing user information.
- Dockerized deployment for easy setup and portability.

## Technologies Used

- Golang
- Next.js (TypeScript)
- PostgreSQL
- Docker

## Folder Structure

The project structure is organized as follows:

- `backend/`: Contains the backend code written in Golang.
- `frontend/`: Contains the frontend code written in Next.js (TypeScript).
- `docker-compose.yaml`: Defines Docker services for running the application.
- `README.md`: Documentation for the project.

## License

This project is licensed under the [MIT License](LICENSE).
