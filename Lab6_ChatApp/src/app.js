const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const { join } = require('path');
const { generateMessage, generateLocationMessage } = require("./utils/messages")
const { addUser, removeUser, getUser, getUsersInRoom, getUserByName } = require('./utils/users')

app.use(express.static(join(__dirname, '/../public')));

//Підключення
io.on('connection', (socket) => {
    console.log("user is connected")
    //Приєднання до кімнати
    socket.on('join', (options, callback) => {
        console.log(options)
        console.log(callback)
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('', `Welcome, ${user.username}, to ${user.room}!`))
        socket.broadcast.to(user.room).emit('message', generateMessage('', `${user.username} has joined!`))
        io.to(user.room).emit('roomData', {
            users: getUsersInRoom(user.room)
        })

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        console.log(socket)
        const user = getUser(socket.id)

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })


    socket.on('userIsTyping', () => {
        const user = getUser(socket.id)
        console.log(user.username)
        socket.broadcast.to(user.room).emit('messageTyping', user.username)
    })


    socket.on('privateMessage', (data, callback) => {
        console.log(data)
        const recipientSocket = io.sockets.sockets.get(getUserByName(data.to).id)
        console.log(recipientSocket)
        const user = getUser(socket.id)
        if (recipientSocket) {
            // Відправити приватне повідомлення до отримувача
            recipientSocket.emit('message', generateMessage(user.username, data.text))
        }
        callback()
    })

    //Відключення
    socket.on('disconnect', () => {
        console.log("user is disconnected")
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('', `${user.username} has left!`))
            io.to(user.room).emit('roomData', {
                users: getUsersInRoom(user.room)
            })
        }
    })
});

server.listen(5000, function () {
    console.log("listening on 5000 port")
})