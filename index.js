const express = require('express');
const mongoose = require('mongoose');
const routes=require("./routes/routes");
const dotenv = require("dotenv")
const cors = require('cors');
dotenv.config()
const app = express();
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 4000;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log(err);
})

app.use("/",routes)
app.get("*", (req, res) => {
    res.status(404).send("404 PAGE NOT FOUND")
})

app.listen(port, () => {
    console.log(`server is running at ${port}`);
})