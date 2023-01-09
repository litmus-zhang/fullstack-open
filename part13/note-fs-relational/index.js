const express = require("express");
const app = express();
const NoteRouter = require("./controllers/notes");
const UserRouter = require("./controllers/users");
const LoginRouter = require("./controllers/login");

const { connectToDatabase } = require("./utils/db");
const { PORT } = require("./utils/config");
app.use(express.json());

app.use("/api/notes", NoteRouter);
app.use("/api/users", UserRouter);
app.use("/api/login", LoginRouter);

const start = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

start();


