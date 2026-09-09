import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

let data = []


const db = new pg.Client({
    user: "postgres",
    database: "library",
    host: "localhost",
    password: "pomaamay6",
    port: 5432
})

db.connect()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", async (req,res) => {
    const result = await db.query("SELECT * FROM books JOIN notes ON books.id=book_id ORDER BY date_read DESC");
    data = result.rows
    res.render("index.ejs", {
        content: data
    });
})

app.get("/notes/:id/:title", async (req,res) => {
    const id = req.params.id;
    const result = await db.query("SELECT * FROM books JOIN notes ON books.id=book_id WHERE notes.id=$1",[id])
    console.log(result.rows[0])
    res.render("notes.ejs", {
        content: result.rows[0]
    })
})

app.get("/add-book", (req, res) => {
    res.render("new.ejs");
})

app.post("/new", async (req, res) => {
    const info = req.body;
    console.log(info)
    const bookResult = await db.query("INSERT INTO books (title, author, isbn) VALUES ($1,$2,$3) RETURNING * ", [info.title, info.author, info.isbn])
    const id = bookResult.rows[0].id
    console.log(id)
    const noteResult = db.query("INSERT INTO notes (rating, summary, date_read, review, book_id) VALUES ($1, $2, $3, $4, $5)",[info.rating, info.summary, info.date, info.review, id])
    res.redirect("/");
})

app.listen(port, () => {
    console.log("Server listening on port 3000")
})