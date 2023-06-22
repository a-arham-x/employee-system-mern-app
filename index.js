const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToMongo = require("./utils/db.js")
app.use(cors())

app.use(bodyParser.json())

connectToMongo()

app.use("/employees", require("./routes/employees"))

app.get("/", (req, res)=>{
    res.send("Hello World");
})

app.listen(port);