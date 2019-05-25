xotArr = []
eatArr = []
teleportArr = []
predatorArr = []
humanArr = []
matrix = [];

matrix = [
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 0, 0, 2, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 5, 0, 1, 3, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 3, 0, 5, 1, 0, 0, 1, 3, 0, 1, 1, 1, 1, 1, 1],
    [0, 1, 5, 3, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 3, 0, 1, 1, 1, 1, 1, 1],
    [0, 3, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 0, 5, 0, 5, 1, 3, 5, 1, 0, 0, 1, 1, 1, 1, 1, 1],
    [0, 3, 0, 3, 0, 1, 0, 0, 1, 3, 0, 1, 1, 1, 1, 1, 1],
    [2, 0, 3, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 3, 0, 0, 0, 1, 0, 1, 1, 2, 2, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1],
];
var Grass = require('./GRASS')
var Eatgrass = require('./Eatgrass')
var Predator = require('./predator')
var Human = require('./Human')
var Teleport = require('./Teleport')

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
let season = "Cmer"
let time = 0
obj = {
    'm': matrix,
    's': season
}
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

function start() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var eatgrass = new Eatgrass(x, y);
                eatArr.push(eatgrass);
            }
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                xotArr.push(grass);
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                var teleport = new Teleport(x, y);
                teleportArr.push(teleport);
            }
            else if (matrix[y][x] == 5) {
                var human = new Human(x, y);
                humanArr.push(human);
            }
        }
    }
}
start()
function game() {
    time++
    if (time <= 30) {
        obj.s = "garun"
    }
    else if (time <= 60) {
        obj.s = "amar"
    }
    else if (time <= 90) {
        obj.s = "ashun"
    }
    else if (time <= 120) {
        obj.s = "Cmer"
    }
    else {
        time = 0
    }
    for (var i in xotArr) {
        xotArr[i].mul();
    }
    for (var i in eatArr) {
        eatArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in humanArr) {
        humanArr[i].eat();
    }
    io.sockets.emit('matrix', obj)
}
setInterval(game, 1000)
console.log('server')

io.on("connection", function (socket) {
    socket.on("valod", function () {
        humanArr = []
        predatorArr = []
        eatArr = []
        xotArr = []

    })
})

