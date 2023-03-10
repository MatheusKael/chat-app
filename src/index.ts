import express from 'express'
import { Server as HttpServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()

const http = new HttpServer(app)


const io = new Server(http)

// It's in memory, not using database for now
var name = new Map(); 

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})


io.on('connection', (socket) => {

    socket.on('name', (nameReceived) =>  { 
        name.set(socket.id, nameReceived);
        socket.broadcast.emit('chat message', `${nameReceived} has connected to the chat!`)
    } )

    socket.on('typing', (sockerId) => {
        socket.broadcast.emit("typing", name.get(sockerId))
    })
    socket.on('chat message', (message) => {
        socket.broadcast.emit("chat message", name.get(socket.id) + ' >' + message)
    })

})

http.listen(8080, () => {
    console.log("app is listenning at port 8080")
})
