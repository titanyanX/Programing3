let LiveForm = require('./class')
module.exports = class Grass extends LiveForm {
    constructor(x, y) {
        super(x, y)
    }
    mul() {
        this.multiply++;
        if (this.multiply == 8) {
            var fundCords = this.getDirections(0);
            var cord = fundCords[Math.floor(Math.random()*fundCords.length)];
            if (cord) {
                var x = cord[0];
                var y = cord[1];
                var norXot = new Grass(x, y);
                xotArr.push(norXot);
                matrix[y][x] = 1;
                this.multiply = 0;
            }
        }
    }
}