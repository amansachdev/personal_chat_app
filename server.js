var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

var messages = [
    {name: "Aman",message:'hi'},
    {name: "Time",message:'hi'},
]

app.get('/messages', (req,res) => {
    res.send(messages)
})

app.post('/messages', (req,res) => {
    res.sendStatus(200)
    messages.push(req.body)
    io.emit("message", req.body)
})

io.on('connection',(socket)=>{
    console.log("User connected")
})

var server = http.listen(process.env.PORT || 5000, ()=>{
    console.log("Server is listening on port", server.address().port)
})