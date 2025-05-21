import express from "express";
import { restRoutes } from "./routes/Users.route.js";
import mongoose from "mongoose";
import connectDatabase from "./database/database.js";

//Initialize an Express application instance to handle routing and middleware
const app = express();

// Use Mongoose to connect your Node.js application to a MongoDB database
connectDatabase();

//Middleware to parse incoming JSON requests
app.use(express.json());

//MiddleWare 1
//Use middleware to log the details of each request (e.g., method, URL, status code). 
app.use((req, res, next) => {

    //condition for the time : allow to call apis only between 6am to 8pm
    const curTime = new Date();
    const curHours = curTime.getHours();
    if (curHours < 6 || curHours > 20) {
        console.log("API access is allowed only from 6am to 8pm")

        return res.status(410).json({
            error: "Access Denied...",
            message: "API access is allowed only from 6am to 8pm"
        });
    }

    // Log status code after response is sent
    res.on("finish", () => {
        const currentTime = new Date().toISOString()
        console.log("=== Incoming Request ============");

        //Log the HTTP method used to (GET ,POST , etc);
        console.log(`Method  :  ${req.method}`);

        //Logs Original Requesed URL
        console.log(`URL  :  ${req.originalUrl} `);

        //Logs the IP address of request
        console.log(`IP Address  :  ${req.ip}`);

        //Logs haders in the requests
        console.log(`HEaders  :  ${JSON.stringify(req.headers)}`);

        //Logs body of request (GET , PUT , POST, etc )
        console.log(`Body  :  ${JSON.stringify(req.body)}`);

        //Logs query parameters
        console.log(`Query Params  :  ${JSON.stringify(req.query)}`);

        //logs route parameters
        console.log(`Route Params  :  ${JSON.stringify(req.params)}`);

        //logs status (200 , 200, 400, 401, etc)
        console.log(`Status  :  ${res.statusCode}`);

        //logs time
        console.log(`time : ${currentTime}`);
        console.log("=================================");

    });

    //continue
    next();
});

//API routing
restRoutes(app);

//Server running on port 8000
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
});


// MiddleWare : Invalid Route Handler
// Returns a 502 error with helpful message
app.use((req, res) => {
    res.status(502).json({
        error: "Invalid routing",
        message: `The requested URL ( ${req.originalUrl} ) not found on this server.. Please Enter valid URL.`
    })
})

// middleware
//JSON Syntax Error Handler
//Returns a 417 error with an explanation
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(417).json({
            error: "Invalid JSON",
            message: "Please check your request body. Make sure JSON is properly formatted."
        });
    }
    next(err); // Pass to default error handler if not a JSON error
});


