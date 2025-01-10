// Add a constant for top padding
const TOP_PADDING = 50

// Tile class
class Tile {
	constructor(x, y) {
		this.value = Math.random() < 0.1 ? 4 : 2
		this.position = createVector(x, y)
		this.pixelPos = createVector(0, 0)
		this.targetPixelPos = createVector(0, 0)
		this.moveSpeed = 0.25
		this.updatePixelPos()
		this.targetPixelPos = this.pixelPos.copy()
	}

	updatePixelPos() {
		this.pixelPos = createVector(
			this.position.x * 200 + 25,
			this.position.y * 200 + 25 + TOP_PADDING
		)
	}

	show() {
		noStroke()

		// Smooth movement animation
		this.pixelPos.x = lerp(
			this.pixelPos.x,
			this.targetPixelPos.x,
			this.moveSpeed
		)
		this.pixelPos.y = lerp(
			this.pixelPos.y,
			this.targetPixelPos.y,
			this.moveSpeed
		)

		// Color based on value
		switch (this.value) {
			case 2:
				fill(238, 228, 218)
				break
			case 4:
				fill(237, 224, 200)
				break
			case 8:
				fill(242, 177, 121)
				break
			case 16:
				fill(245, 149, 99)
				break
			case 32:
				fill(246, 124, 95)
				break
			case 64:
				fill(246, 94, 59)
				break
			case 128:
				fill(237, 207, 114)
				break
			case 256:
				fill(237, 204, 97)
				break
			case 512:
				fill(237, 200, 80)
				break
			case 1024:
				fill(237, 197, 63)
				break
			case 2048:
				fill(237, 194, 46)
				break
			default:
				fill(60, 58, 50)
				break
		}

		rect(this.pixelPos.x, this.pixelPos.y, 180, 180, 5)
		fill(this.value >= 8 ? 255 : 0)
		textAlign(CENTER, CENTER)
		textSize(this.value >= 1000 ? 30 : 40)
		text(this.value.toString(), this.pixelPos.x + 90, this.pixelPos.y + 90)
	}

	moveTo(to) {
		this.position = to.copy()
		this.targetPixelPos = createVector(
			this.position.x * 200 + 25,
			this.position.y * 200 + 25 + TOP_PADDING
		)
	}
}

// Button class
class Button {
	constructor(x, y, w, h, label) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.label = label
	}

	show() {
		noStroke()
		fill(143, 122, 102)
		rect(this.x, this.y, this.w, this.h, 5)

		fill(249, 246, 242)
		textAlign(CENTER, CENTER)
		textSize(20)
		text(this.label, this.x + this.w / 2, this.y + this.h / 2)
	}

	isMouseOver() {
		return (
			mouseX >= this.x &&
			mouseX <= this.x + this.w &&
			mouseY >= this.y &&
			mouseY <= this.y + this.h
		)
	}
}

// Player class
class Player {
	constructor() {
		this.score = 0
		this.tiles = []
		this.emptyPositions = []
		this.moveDirection = createVector(0, 0)
		this.moved = false
		this.gameOver = false
		this.scoreBackgroundColor = color(187, 173, 160)

		this.fillEmptyPositions()
		this.addNewTile()
		this.addNewTile()
	}

	fillEmptyPositions() {
		this.emptyPositions = []
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				this.emptyPositions.push(createVector(i, j))
			}
		}
	}

	setEmptyPositions() {
		this.emptyPositions = []
		let occupied = Array(4)
			.fill()
			.map(() => Array(4).fill(false))

		for (let tile of this.tiles) {
			let x = floor(tile.position.x)
			let y = floor(tile.position.y)
			if (x >= 0 && x < 4 && y >= 0 && y < 4) {
				occupied[x][y] = true
			}
		}

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				if (!occupied[i][j]) {
					this.emptyPositions.push(createVector(i, j))
				}
			}
		}
	}

	show() {
		// Draw grid
		stroke(187, 173, 160)
		strokeWeight(2)
		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				fill(205, 193, 180)
				rect(i * 200 + 25, j * 200 + 25 + TOP_PADDING, 180, 180, 5)
			}
		}

		// Draw tiles
		for (let tile of this.tiles) {
			tile.show()
		}

		// Draw score box
		fill(this.scoreBackgroundColor)
		noStroke()
		rect(25, 25 + TOP_PADDING, 150, 70, 5)
		fill(237, 228, 218)
		textAlign(CENTER, CENTER)
		textSize(16)
		text("SCORE", 100, 45 + TOP_PADDING)
		textSize(28)
		text(this.score.toString(), 100, 75 + TOP_PADDING)

		// Draw game over screen
		if (this.gameOver) {
			// Semi-transparent overlay
			fill(250, 248, 239, 240)
			rect(0, 0, width, height)

			// Game Over text
			fill(119, 110, 101)
			textAlign(CENTER, CENTER)
			textSize(72)
			text("Game Over!", width / 2, height / 2 - 50 + TOP_PADDING)

			// Final Score
			fill(119, 110, 101)
			textSize(36)
			text(
				"Final Score: " + this.score,
				width / 2,
				height / 2 + 30 + TOP_PADDING
			)

			// Draw restart button
			this.drawButton(
				width / 2 - 100,
				height / 2 + 80 + TOP_PADDING,
				200,
				50,
				"Play Again",
				true
			)
		}
	}

	drawButton(x, y, w, h, label, isGameOver) {
		noStroke()
		fill(143, 122, 102)
		rect(x, y, w, h, 5)

		fill(249, 246, 242)
		textSize(isGameOver ? 24 : 20)
		textAlign(CENTER, CENTER)
		text(label, x + w / 2, y + h / 2)
	}

	move() {
		if (this.gameOver) return

		this.moved = false
		let sortingOrder = []
		let sortingVec = createVector()
		let vert = false

		if (this.moveDirection.x === 1) {
			sortingVec = createVector(3, 0)
			vert = false
		} else if (this.moveDirection.x === -1) {
			sortingVec = createVector(0, 0)
			vert = false
		} else if (this.moveDirection.y === 1) {
			sortingVec = createVector(0, 3)
			vert = true
		} else if (this.moveDirection.y === -1) {
			sortingVec = createVector(0, 0)
			vert = true
		}

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				let temp = createVector(sortingVec.x, sortingVec.y)
				if (vert) {
					temp.x += j
				} else {
					temp.y += j
				}
				sortingOrder.push(temp)
			}
			if (vert) {
				sortingVec.y -= this.moveDirection.y
			} else {
				sortingVec.x -= this.moveDirection.x
			}
		}

		let merged = Array(4)
			.fill()
			.map(() => Array(4).fill(false))

		for (let pos of sortingOrder) {
			for (let i = this.tiles.length - 1; i >= 0; i--) {
				let tile = this.tiles[i]
				if (
					floor(tile.position.x) === floor(pos.x) &&
					floor(tile.position.y) === floor(pos.y)
				) {
					let moveTo = createVector(
						tile.position.x + this.moveDirection.x,
						tile.position.y + this.moveDirection.y
					)

					while (true) {
						let nextX = floor(moveTo.x)
						let nextY = floor(moveTo.y)

						if (nextX < 0 || nextX >= 4 || nextY < 0 || nextY >= 4) {
							moveTo.sub(this.moveDirection)
							break
						}

						let valueOfMoveTo = this.getValue(nextX, nextY)

						if (
							valueOfMoveTo === -1 ||
							(valueOfMoveTo !== 0 && valueOfMoveTo !== tile.value)
						) {
							moveTo.sub(this.moveDirection)
							break
						}

						if (valueOfMoveTo === tile.value && !merged[nextX][nextY]) {
							for (let j = this.tiles.length - 1; j >= 0; j--) {
								let other = this.tiles[j]
								if (
									other !== tile &&
									floor(other.position.x) === nextX &&
									floor(other.position.y) === nextY
								) {
									tile.value *= 2
									this.score += tile.value
									this.tiles.splice(j, 1)
									merged[nextX][nextY] = true
									this.moved = true
									break
								}
							}
							break
						}

						if (valueOfMoveTo === 0) {
							moveTo.add(this.moveDirection)
							this.moved = true
						} else {
							break
						}
					}

					if (!tile.position.equals(moveTo)) {
						tile.moveTo(moveTo)
						this.moved = true
					}
				}
			}
		}

		this.moveDirection = createVector(0, 0)
		this.setEmptyPositions()

		if (this.moved) {
			this.addNewTile()
			this.gameOver = this.isGameOver()
		}
	}

	addNewTile() {
		if (this.emptyPositions.length > 0) {
			let index = floor(random(this.emptyPositions.length))
			let pos = this.emptyPositions[index]
			this.tiles.push(new Tile(floor(pos.x), floor(pos.y)))
			this.emptyPositions.splice(index, 1)
		}
	}

	isGameOver() {
		if (this.emptyPositions.length > 0) {
			return false
		}

		for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				let currentValue = this.getValue(i, j)
				if (this.getValue(i + 1, j) === currentValue) return false
				if (this.getValue(i, j + 1) === currentValue) return false
			}
		}

		return true
	}

	isRestartButtonClicked(mouseX, mouseY) {
		if (!this.gameOver) return false

		let buttonX = width / 2 - 100
		let buttonY = height / 2 + 80 + TOP_PADDING
		let buttonWidth = 200
		let buttonHeight = 50

		return (
			mouseX >= buttonX &&
			mouseX <= buttonX + buttonWidth &&
			mouseY >= buttonY &&
			mouseY <= buttonY + buttonHeight
		)
	}

	getValue(x, y) {
		if (x < 0 || x >= 4 || y < 0 || y >= 4) return -1
		for (let tile of this.tiles) {
			if (floor(tile.position.x) === x && floor(tile.position.y) === y) {
				return tile.value
			}
		}
		return 0
	}
}

// Global variables
let p
let restartButton

function setup() {
	createCanvas(850, 900) // Made canvas slightly taller to accommodate padding
	p = new Player()
	restartButton = new Button(685, 25 + TOP_PADDING, 120, 40, "Restart")
	frameRate(60)
}

function draw() {
	background(color(250, 248, 239))
	p.show()
	restartButton.show()
}

function mousePressed() {
	if (restartButton.isMouseOver() || p.isRestartButtonClicked(mouseX, mouseY)) {
		p = new Player() // Reset the game
	}
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		p.moveDirection = createVector(0, -1)
	} else if (keyCode === DOWN_ARROW) {
		p.moveDirection = createVector(0, 1)
	} else if (keyCode === LEFT_ARROW) {
		p.moveDirection = createVector(-1, 0)
	} else if (keyCode === RIGHT_ARROW) {
		p.moveDirection = createVector(1, 0)
	}

	p.move()
	if (p.moved) {
		p.addNewTile()
	}
}
