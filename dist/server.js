"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, res) => {
    console.log(req.method);
    // Home route
    if (req.url === "/") {
        if (req.method === "POST") {
            res.writeHead(201, { "Content-Type": "text/plain" });
            res.write("Todo added!");
            res.end();
            return;
        }
        if (req.method === "DELETE") {
            res.writeHead(204, { "Content-Type": "text/plain" });
            res.write("Item deleted");
            res.end();
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<h1>This is my home page :)</h1>");
        res.end();
        return;
    }
    // Admin route
    if (req.url === "/admin") {
        res.writeHead(401, { "Content-Type": "text/plain" });
        res.write("You do not have the correct credentials!");
        res.end();
        return;
    }
    // Todo route
    if (req.url === "/api/todo") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const todo = {
            title: "Clean the room",
            completed: false
        };
        res.write(JSON.stringify(todo)); // convert obj to string
        res.end();
        return;
    }
    // 404 Fallback route
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("<h1>Page not found. I'm sorry :(</h1>");
    res.end();
});
const PORT = 4500;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});
