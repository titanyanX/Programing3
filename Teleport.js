class Teleport {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.directions = []
        this.energy = 5
    }
    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(r, t) {
        this.newDirections()
        let found = []
        for (let i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (r <= matrix[y][x] <= t) {
                    found.push(this.directions[i])
                }
            }
        }
        return found;
    }

    move() {
        let x = Math.floor(random(100))
        let y = Math.floor(random(100))
        if (matrix[y][x] < 2) {
            matrix[this.y][this.x] = 0
            matrix[y][x] = 4
            this.x = x
            this.y = y
        }
    }
    eat() {
        this.move()
        let fundCords = this.chooseCell(1, 3)
        for (let i in fundCords) {
            if (fundCords) {
                let x = fundCords[i][0]
                let y = fundCords[i][1]
                switch (matrix[y][x]) {
                    case 1:
                        for (let i in xotArr) {
                            if (x == xotArr[i].x && y == xotArr[i].y) {
                                xotArr.splice(i, 1)
                            }
                        }
                        break;
                    case 2:
                        for (let i in eatArr) {
                            if (x == eatArr[i].x && y == eatArr[i].y) {
                                eatArr.splice(i, 1);
                            }
                        }
                        break
                    case 3:
                        for (let i in predatorArr) {
                            if (x == predatorArr[i].x && y == predatorArr[i].y) {
                                predatorArr.splice(i, 1);
                            }
                        }
                        break;
                    default:
                        break;
                }
                matrix[y][x] = 0
            }
            else {
                this.move()
                this.energy--
                
                if (this.energy <= 0) {
                    this.die()
                }
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in teleportArr) {
            if (this.x == teleportArr[i].x && this.y == teleportArr[i].y) {
                teleportArr.splice(i, 1);
            }
        }
    }
}