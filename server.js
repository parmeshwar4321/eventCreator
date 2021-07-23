const express = require("express");
const app = express();
require("dotenv").config()
app.use(express.json())

// database
const db = require("./databaseConection/conection")

const router = require("./routes/router");
app.use("/",router)
const port = process.env.PORT || 5050

app.listen(port,()=>{
    console.log(`server is running at Port:${port}`);
})