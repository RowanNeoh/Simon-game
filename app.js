import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
app.use(express.static("public"));
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {     
    res.render("index.ejs");  
});

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});
