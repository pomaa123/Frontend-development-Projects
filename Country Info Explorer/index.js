import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.post("/results", async (req, res) => {
    const countryName = req.body.countryName
    const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`, req.body)
    console.log(response.data[0].name.common)
    res.render("index.ejs", {
        content : response.data,
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})