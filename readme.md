# Assignment : User Photo Upload

This repository contains an Express.js application for user registration and photo upload. Users can register with their name, email, and password, and can upload up to 3 photos. The uploaded photos are resized and stored on the server.

## Installation

1. Clone the repository:


2. Navigate to the project directory:


3. Install dependencies:


4. Set up MongoDB:
- Create a MongoDB Atlas account or use an existing one.
- Replace the connection string in `app.js` with your MongoDB Atlas connection string.

## Usage

1. Start the server:


2. Access the application on `http://localhost:3000`.

## Endpoints

- `GET /hello-world`: Returns a simple "Hello World" message.
- `GET /get-users`: Retrieves all users from the database.
- `POST /upload-photo`: Allows users to register and upload photos. Requires `username`, `email`, `password`, and `images` in the request body.

## Models

### User

The `User` model represents registered users.

#### Fields

- `username`: Name of the user. Required, must be between 3 and 20 characters.
- `email`: Email address of the user. Required, unique, and must be a valid email address.
- `password`: Password of the user. Required, hashed for security.
- `images`: Array of uploaded photo filenames.
- `createdAt`: Date and time when the user was created.

## Middlewares

- `uploadUserPics`: Middleware for handling file uploads using Multer. Limits upload to images and allows a maximum of 3 files.
- `resizeUserPhoto`: Middleware for resizing and formatting uploaded images using Sharp.

## Demo Images

Here are some demo images showcasing the functionality of the application:

# Create a user by sending form data to the respective route.

1. ![image](https://github.com/guptakshitij2308/Ratio-Backend-Assignment/assets/111740678/1ded1575-c84b-475a-bfab-618e286159a0)

# Check if user is created or not

2. ![image](https://github.com/guptakshitij2308/Ratio-Backend-Assignment/assets/111740678/c0c7ba65-8d2e-4881-b4fb-20942be3a638)

# User stored in atlas db

3. ![image](https://github.com/guptakshitij2308/Ratio-Backend-Assignment/assets/111740678/9159052c-16ce-4003-b428-6218abf4fcfc)
   
# The images uploaded stored on the server in public\img\users folder

4. ![image](https://github.com/guptakshitij2308/Ratio-Backend-Assignment/assets/111740678/7ea63fb7-5dd8-4959-bbac-b0bd8e22c9b4)



Feel free to explore more by trying out the application!
