xotArr = []
eatArr = []
teleportArr = []
predatorArr = []
humanArr = []

function genetareMatrix(lengthY, lengthX, number) {
    let matrix = [];
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
    for (let y = 0; y < lengthY; y++) {
        matrix.push([]);
        for (let x = 0; x < lengthX; x++) {
            let randomCount = getRandomInt(number);
            matrix[y].push(randomCount);
        }
    }
    return matrix;
}
let matrix = genetareMatrix(100, 100, 6);
var Grass = require('./GRASS')
var Eatgrass = require('./Eatgrass')
var Predator = require('./predator')
var Human = require('./Human')
var Teleport = require('./Teleport')

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

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
    //յուրաքանչյուր խոտ փորձում է բազմանալ
    for (var i in xotArr) {
        xotArr[i].mul();
    }
    //յուրաքանչյուր խոտակեր փորձում է ուտել խոտ
    for (var i in eatArr) {
        eatArr[i].eat();
    }
    for (var i in teleportArr) {
        teleportArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in humanArr) {
        humanArr[i].eat();
    }
    io.sockets.emit('matrix', matrix)
}
setInterval(game, 1000)