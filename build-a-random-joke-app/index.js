const express = require("express");
const app = express();

const port = 3000;

app.get("/", (req, res) => {
	res.send("Welcome to Camper Bot's homepage!");
});

app.get("/hobbies", (req, res) => {
	
});

app.get("/skills", (req, res) => {
});

app.get("/api/profile", (req, res) => {
});

app.listen(port, () => {
	console.log(`You are listening on port: ${port}`);
});
