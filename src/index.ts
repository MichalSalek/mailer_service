import http from 'http'



// create the http server
const server = http.createServer((req, res) => {

    // Creating a task
    if (req.method == "POST" && req.url == "/api/tasks") {
        return addTask(req, res);
    }

});

// set up the server port and listen for connections
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});