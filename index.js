const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];

app.get("/whoami", (req, res) => {
    res.send({studentNumber : 2663134});
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});