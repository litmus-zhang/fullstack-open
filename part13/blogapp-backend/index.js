const express = require("express");
const app = express();
app.use(express.json());

const { connectToDb } = require("./utils/db");
const { PORT } = require("./utils/config");


//routes
const blogRouter = require("./controllers/blogs");

app.use("/api/blogs", blogRouter);

const startServer = async () => {
    await connectToDb();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();

