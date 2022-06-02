// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server

//port that our local server will used to run at
const port = 8000;

//check if the server is running
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});

// "/datura" the  url which will be used to set data into our server
app.post("/datura", (req, res) => {
  //save the coming data in projectData object => 'date','temp',','feelings'
  projectData.date = req.body.newDate;
  projectData.temp = req.body.temp;
  projectData.feelings = req.body.feelings;
  res.end();
});

// "/datta" the  url which will be used to get data from our server
app.get("/datta", (req, res) => {
  res.send(projectData); //send data in projectData => 'date','temp',','feelings'
});
