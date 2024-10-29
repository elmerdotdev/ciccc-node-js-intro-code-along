import http from 'http';

interface Todo {
  title: string,
  completed: boolean
}

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
  console.log(req.method)

  // Home route
  if (req.url === "/") {
    if (req.method === "POST") {
      res.writeHead(201, { "Content-Type": "text/plain" })
      res.write("Todo added!")
      res.end()
      return
    }

    if (req.method === "DELETE") {
      res.writeHead(204, { "Content-Type": "text/plain" })
      res.write("Item deleted")
      res.end()
      return
    }

    res.writeHead(200, { "Content-Type": "text/html" })
    res.write("<h1>This is my home page :)</h1>")
    res.end()
    return
  }

  // Admin route
  if (req.url === "/admin") {
    res.writeHead(401, { "Content-Type": "text/plain" })
    res.write("You do not have the correct credentials!")
    res.end()
    return
  }

  // Todo route
  if (req.url === "/api/todo") {
    res.writeHead(200, { "Content-Type": "application/json" })
    const todo: Todo = {
      title: "Clean the room",
      completed: false
    }
    res.write(JSON.stringify(todo)) // convert obj to string
    res.end()
    return
  }

  // 404 Fallback route
  res.writeHead(404, { "Content-Type": "text/html" })
  res.write("<h1>Page not found. I'm sorry :(</h1>")
  res.end()
});

const PORT: number = 4500
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`)
})