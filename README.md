# Full Stack Test Task: User Authentication Module

This project implements a user authentication module allowing users to sign up and sign in to the application. It consists of both front-end development using React and back-end development using NestJS with MongoDB as the database.

## Front-end Development (React)

### Sign up page:

- Implemented a signup form with fields for email, name, and password.
- Implemented client-side validation for password requirements.
- Upon successful signup, users are redirected to the dashboard page.

-

### Sign in page:

- Created a sign-in form with fields for email and password.
- Implemented client-side validation for email and password fields.

### Application pages:

- Implemented a profile page to show information about the user.
  - Displays user's email and name.
  - Provides an option to log out.

## Back-end Development (NestJS with MongoDB)

### Setup:

- Created a NestJS project and set up MongoDB connection using NestJs/Mongoose.

### Endpoints:

- `/api/users/signup`: Handles user registration, validating input against specified requirements, and securely storing passwords.
- `/api/auth/login`: Handles user authentication, validating credentials against the database and issuing JWT tokens upon successful authentication.
- `/api/profile`: Retrieves user profile information.
  - Requires authentication using JWT.

### Security and Best Practices:

- Implemented middleware for input validation, error handling, and authentication.
- Followed security best practices such as encryption for sensitive information and secure JWT implementation.



## Submission


### Running the Project Locally:

1. Clone the repository:

   ```bash
   git clone git@github.com:Algidaq/easy-gen-fullstack-test.git
   ```

2. Create .env file inside bakcned folder add following envs to project 

    ```bash 
            PORT=3001
            JWT_SECRET=SECRET
            NODE_ENV=production | development
            DB_URL=mongodb://username:password@host:port/database
    ```

3. If you don't have mongodb installed in your system, makesure you have  docker installed and run the following in backend folder: 

    ```bash 
        docker compose -f docker-compose.yaml up -d
     ```

4. install deps then run development server :
    ```bash 
        npm i --save && npm run start:dev
    ```


5. In fronted project install deps: 

    ```bash 
        npm i --save
    ```

6. create env file from the following sample:

  ```bash 
         VITE_BASE_URL = http://localhost:port/api
    ```

7. start fronted project: 

    ```bash 
        npm run dev
    ```