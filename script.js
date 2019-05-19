var side = 10;
var socket = io()
function setup() {
    noStroke();
    frameRate(1);
    createCanvas(100 * side, 100 * side);
    background('#acacac');
}
function drawM() {
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                fill("green");
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