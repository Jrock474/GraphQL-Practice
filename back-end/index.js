const express = require("express");
const bodyParser = require("body-parser");
const port = 3001;
const app = express();

app.use(express.json());
app.use(bodyParser.json())







app.listen(port, () =>{
    console.log(`server is running on port ${port}`)
})