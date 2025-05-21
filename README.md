----------------------------------- Assignment 2 ----------------------------------------
Build a RESTful API with MongoDB using Node.js and Express

Expand on the previous assignment by integrating MongoDB as a database, testing concepts such as database interaction, CRUD operations, and advanced middleware handling

--------------- File Setup -------------------------------------------------
index.js :  
1. Main file (start application)

Users.model.js :  
1. User schema for storing user data
2. Enforce validation rules on each field.
3. Define how user data should look.

Users.route.js :  REST API Routes
1. Uses app.get, app.post, app.put, and app.delete methods to handle HTTP requests.
2. Applied middleware

User.controller.js : 
1. function (impementation) of all routes
2. Perform CRUD operations on MongoDB.

database.js :
Mongooseto connect your Node.js application to a MongoDB database.


------------------------------------------------------- commands To run project-------------------------------------------------
1. Installs all project dependencies =>  npm i 
2. Starts the app using the command  =>   npm start
3. code file => server.js 

----------------------------------------------------------- Git -----------------------------------------------
https://github.com/Aishwaryajadhav2000/Assignment2


----------------------------------------Installation----------------------------------------------
1. mongoose
2. Nodemon - Installed to automatically restarts Node.js server whenever make changes in code.
3. Express - To build APIs and handle routing
4. bcrypt  - library to hash passwords securely.


-------------------npm start--------------
1. npm start : start server => file index.js


---------------------Use Mongoose to connect your Node.js application to a MongoDB database---------------------
URL => mongodb://localhost:27017/assignment2
(remove database name assignment2 while testing)

--------------------------------URL------------
    http://localhost:8000/


------------------------ Create a schema for storing user data. with proper validations ----------------
   Users.model.js

------------------ User Schema ---------------
Create a schema for storing user data. Schema should have proper validations.
1. fullName : Once name added cannot update name , required , 
2. Age : required , age between 18 to 60
3. isAdult : manually set true
4. profession : required
5. experience : required , between 0 to 50
6. location : default value set as "Not specified"
7. skills : required
8. email : Once email added cannot update email , required , lowercase(more validation added in middleware)
9. isWorking : required



----------------------------- API's =>
1. GET /users => Fetch the list of all users.
    If no data to display : User List is empty.. Please add new users..

2. GET /users/:id => Fetch details of a specific user by ID.
    If id does not exist : No user found with Id

3. POST /user  => Add a new user.

4. PUT /user/:id  => Update details of an existing user.
    if id not exist : Cannot update..No user found with ID

5. DELETE /user/:id  => Delete a user by ID.
    if id not exist : Cannot Delete..No user found with ID

6. DELETE /users  => Delete all users.
    If list empty : No users to delette



------------------------------------MIDDLEWARES =>
Extra middleware added for more practice  



1. MiddleWare 1 :=> index.js
    1. log the details of each request : method, URL, status code , ip ,
        headers , request body , request query , requested parameters , Time
    
    2. API can calls only from 6am to 10pm


2. Middleware 2 :=> middleware.js
    1. Implement validation middleware to check for required fields in thePOST and PUT routes.
    2. Validation for skills : should be an array and should not empty.
    3. Validation for experience and age : Must be a number
    4. Validation for is working : must be a boolean
    5. Validation for fullname , profession , email , location : must be a  string
    6. Validation for fullname , profession , email , location : must be non-empty string
    7. Age should be between 18 to 50
    8. Invalid Email format



3. Middleware 3 : => index.js
Implement to check invalid URL

4. Middleware 4 : => index.js
Implement for error handling ( if incorrect json file )

----------------------- Error handling =>
200 :  for successful GET requests
201 : successfull post request
200 : Successful put request
204 : successful delete request

400 : Bad Request
404 : Not Found
417 : Expectation failed (Inproper JSON format)
410 : Requested page not available (before 6am and after 8pm)
412 Precondition Failed (All validation errors)
502 : Bad Gateway (Invalid URL)
