//import express and cors
import express from "express";
import cors from "cors";

//create the app
const app = express();

const port = 3000;

//add the JSON middleware
app.use(express.json());

//add the CORS middleware
app.use(cors());

//start listening on the port and log a message
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});