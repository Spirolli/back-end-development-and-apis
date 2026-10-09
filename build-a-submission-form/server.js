import express from 'express';
import apiRouter from "./routes/api.routes.js";
import { notFoundHandler, finalErrorHandler } from "./middleware/error.middleware.js";
const app = express();


app.use((req, res, next) => {
	console.log(`url: ${req.url}\tmethod: ${req.method}`);
	next();
});

app.use("/api", apiRouter);

app.use(notFoundHandler);

app.use(finalErrorHandler);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const server = app.listen(3000, () => { 
	const server_url = server.address().address === "::" ? 'localhost' : server.address().address;
	console.log(`server url: ${server_url}:${server.address().port}`); 
});
