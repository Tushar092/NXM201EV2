const express = require("express");
const connection = require("./db");
const userroutes = require("./routes/user.routes");
const blogroutes = require("./routes/blogs.routes");

const app = express();
app.use(express.json());

app.use("/user", userroutes);
app.use("/blog", blogroutes);

app.listen(`${process.env.port}`, async () => {
    try {
        await connection;
        console.log("Connected to Atlas");
        console.log(`Server running on port ${process.env.port}`);
    } catch (error) {
        console.log("ERROR...................", error.message);
    }
});