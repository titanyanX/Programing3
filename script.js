var side = 10;
var socket = io()
function setup() {

    frameRate(1);
    createCanvas(17 * side, 13 * side);
    background('#acacac');
}
function drawM(obj) {
    matrix = obj.m;
    season = obj.s;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {

                if (season == "Cmer") {
                    fill("white")

                }
                else if (season == "garun") {
                    fill("orange")

                }

                else {
                    fill("green");
                }

            } else if (matrix[i][j] == 2) {
                fill("orange");
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
            }
            else if (matrix[i][j] == 3) {
                fill('red');
            }
            else if (matrix[i][j] == 4) {
                fill('blue');
            }
            else if (matrix[i][j] == 5) {
                fill('black');
            }
            rect(j * side, i * side, side, side);

        }
    }
}
socket.on('matrix', drawM)
function MAH() {
    socket.emit("valod")
}