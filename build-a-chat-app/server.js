import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;

const server = http.createServer( (req, res) => {
  const files = {
	"/": { path: "./public/index.html", contentType: "text/html" },
  };
  const file = files[req.url];

  if (!file) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
    return;
  }

  fs.readFile(file.path, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error loading page");
      return;
    }
    res.writeHead(200, { "Content-Type": file.contentType });
    res.end(data);
  });
});


const wss = new WebSocketServer({ server });

wss.on("connection", (socket, req) => {
	const username = new URL(req.url, "http://localhost").searchParams.get(
		"username", );
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({"type":"system", "text": `${username} joined`}));
		}
	});

	socket.on("message", (data) => {
		wss.clients.forEach((client) => {
			const { username, text } = JSON.parse(data);
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify({type: 'chat', "username": username, "text": text}));
			}
		});
	});

	socket.on("close", () => {
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify({type: 'system', "text": `${username} left`}));
			}
		});
	});
});

server.listen(PORT, () => {
	console.log("Chat server running at http://localhost:3001");
});
