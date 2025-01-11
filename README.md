# 2048 Game
This is a simple implementation of the popular **2048 game** made using the `p5.js` library.
You can play the game online by clicking on the link below:
[Play 2048 Game](https://lucifer-prashant.github.io/2048_game/)

## About the Game
The 2048 game is a sliding tile puzzle where the objective is to combine tiles with the same numbers to reach the number **2048**. The game ends when there are no valid moves left.

## Features
- Built entirely using the `p5.js` library.
- Interactive and intuitive gameplay.
- Smooth animations for tile movements.
- Simple user interface.

## How to Play
1. Use the arrow keys on your keyboard to slide tiles:
   - **Up Arrow**: Slide tiles up.
   - **Down Arrow**: Slide tiles down.
   - **Left Arrow**: Slide tiles left.
   - **Right Arrow**: Slide tiles right.
2. When two tiles with the same number collide, they merge into one, doubling the number.
3. Try to reach the **2048 tile** before running out of moves!

## Installation Options

### Local Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/Lucifer-Prashant/2048_game.git
   ```
2. Navigate to the project directory:
   ```bash
   cd 2048_game
   ```
3. Open the `index.html` file in your web browser to start the game.

### Using Docker
You can run the game using Docker in two ways:

#### Option 1: Pull from GitHub Container Registry
1. Pull the Docker image:
   ```bash
   docker pull ghcr.io/lucifer-prashant/2048_game:latest
   ```
2. Run the container:
   ```bash
   docker run -p 8080:80 ghcr.io/lucifer-prashant/2048_game:latest
   ```
3. Open your browser and visit `http://localhost:8080`

#### Option 2: Build and Run Locally with Docker Compose
1. Clone the repository (if not already done)
2. Navigate to the project directory
3. Run with Docker Compose:
   ```bash
   docker-compose up --build
   ```
4. Open your browser and visit `http://localhost:8080`

## Technologies Used
- **p5.js**: A JavaScript library for creative coding.
- **HTML/CSS**: For structuring and styling the game.
- **Docker**: For containerization and easy deployment.
- **Nginx**: As the web server for the Docker container.

## License
This project is open-source and available under the MIT License. Feel free to fork, modify, and distribute it as per the license terms.

---
Enjoy the game and challenge yourself to reach 2048!
