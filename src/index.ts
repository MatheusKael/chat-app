import express from 'express'
import { Server as HttpServer } from 'node:http'
import { Server } from 'socket.io'

const app = express()

const http = new HttpServer(app)


const io = new Server(http)


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {

    console.log('User connected!')
    socket.on('chat message', (message) => {
        console.log('chat -> ' + message)
    })
})

http.listen(8080, () => {
    console.log("app is listenning at port 8080")
})
