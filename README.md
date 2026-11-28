# THRIFT HAPPENS

This app is a clothing store inventory that allows users to manage products. It uses a React frontend, an Express backend, and MongoDB to store information.

## requirements 
node.js
mongoDB

## backend setup:
1. Open a terminal in the project folder.

2. Navigate to the backend folder:

3. type "cd backend" in terminal

4. Install the required packages: 
 type "npm install" in terminal

5. Copy .env.example into a new file named .env.

6. Open .env and enter your own MongoDB connection string for MONGO_URI.

7. Load the 50 products into the database: 
type "npm run seed" in terminal

8. Start the backend server: 
type "npm run dev" in terminal

The API will run on port 3000.

## Frontend Setup

1. Open a second terminal.

2. Navigate to the frontend folder:

3. type "cd frontend" in terminal

4. Install the required packages: 
type "npm install" into terminal

5. Start the frontend:

type "npm run dev" in terminal

6. Open the link displayed in the terminal to view the app.

## API Endpoints

 Method  Route  Description  Status codes 
 GET  `/data`  Returns all products.  200, 500 
 POST `/data` Adds a new product. 201, 400, 500
 PATCH `/data/:id` Updates a product. 200, 400, 404, 500
 DELETE `/data/:id` deletes a product. 200, 400, 404, 500

## NOTES 
i unfortunately did not manage to add the add/edit form and the edit/delete buttons.