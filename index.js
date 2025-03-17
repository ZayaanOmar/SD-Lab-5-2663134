const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let books = [];

app.get("/whoami", (req, res) => {
    res.send({ studentNumber : 2663134 });
});

app.get("/books", (req, res) => {
    res.send(books);
});

app.get("/books/:id", (req, res) => {
    const book = books.find(i => i.id == req.params.id);
    
    if (!book) return res.status(404).json({ error : "Book Not Found" });

    res.send(book);
});

app.post("/books", (req, res) => {
    const { id, title, details } = req.body;

    if (!id || !title || !Array.isArray(details)) {
        return res.status(400).json({ error : "Missing required book details" });
    }

    details.forEach(detail => {
        if (!detail.id || !detail.author || !detail.genre || !detail.publicationYear) {
            return res.status(400).json({ error : "Missing required book details" });
        }
    });

    const newBook = { id, title, details };
    books.push(newBook);
}); 

app.put("/books/:id", (req, res) => {

    const { id } = req.params;

    const { title, details } = req.body;

    let bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex == -1) return res.status(404).json({ error : "Book Not Found" });

    books[bookIndex] = { id, title, details };

});

app.delete("/books/:id", (req, res) => {
    const bookID = books.findIndex(book => book.id == req.params.id);

    if (bookID == -1) return res.status(404).json({ error : "Book Not Found"});

    books.splice(bookID, 1);
});

app.post("/books/:id/details", (req, res) => {
    const bookID = books.findIndex(book => book.id = req.params.id);

    const detail = req.body;

    if (bookID === -1) return res.status(404).json({ error : "Book Not Found"});

    books[bookID].details.push(detail);

});

app.delete("books/:id/details/:detailId", (req, res) => {
    const bookID = books.findIndex(book => book.id === req.params.id);
    const detailId = req.params.detailId;
    if (bookID === -1) return res.status(404).json({ error : "Book Not Found"});

    books[bookID].details.splice(detailId, 1);

});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});