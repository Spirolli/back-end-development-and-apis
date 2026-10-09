const express = require("express");
const path = require("path");
const app = express();
const { inputCleaner, inputValidator } = require("./middleware.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req,res) => {
	console.log("Getting root, redirecting");
	res.redirect("/form");
});

app.get("/form", (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/submit", [inputCleaner, inputValidator], (req, res) => {
	res.json({username: req.body.username, comment: req.body.comment});
});

app.listen(3000);
