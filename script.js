const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const player1HealthDisplay = document.getElementById('player1-health');
const player2HealthDisplay = document.getElementById('player2-health');

const player1Speed = 10;
const player2Speed = 10;

const gameAreaWidth = window.innerWidth;
const gameAreaHeight = window.innerHeight;

let player1Position = { x: 20, y: 0 };
let player2Position = { x: gameAreaWidth - 70, y: 0 };

let player1Health = 100;
let player2Health = 100;

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        // Movimiento del Jugador 1
        case 'a': // Izquierda
            player1Position.x -= player1Speed;
            break;
        case 'd': // Derecha
            player1Position.x += player1Speed;
            break;
        case 'w': // Arriba
            player1Position.y -= player1Speed;
            break;
        case 's': // Abajo
            player1Position.y += player1Speed;
            break;
        case ' ': // Ataque (barra espaciadora)
            attack(player1, player2);
            break;

        // Movimiento del Jugador 2
        case 'ArrowLeft': // Izquierda
            player2Position.x -= player2Speed;
            break;
        case 'ArrowRight': // Derecha
            player2Position.x += player2Speed;
            break;
        case 'ArrowUp': // Arriba
            player2Position.y -= player2Speed;
            break;
        case 'ArrowDown': // Abajo
            player2Position.y += player2Speed;
            break;
        case 'Enter': // Ataque (tecla Enter)
            attack(player2, player1);
            break;
    }

    updatePositions();
});

function attack(attacker, defender) {
    const attackerRect = attacker.getBoundingClientRect();
    const defenderRect = defender.getBoundingClientRect();

    if (attackerRect.x < defenderRect.x + defenderRect.width &&
        attackerRect.x + attackerRect.width > defenderRect.x &&
        attackerRect.y < defenderRect.y + defenderRect.height &&
        attackerRect.y + attackerRect.height > defenderRect.y) {
        defender.style.backgroundColor = 'yellow';
        setTimeout(() => {
            defender.style.backgroundColor = defender === player1 ? 'blue' : 'green';
        }, 200);

        // Reducir la vida del defensor
        if (defender === player1) {
            player1Health -= 10;
            player1HealthDisplay.textContent = player1Health;
        } else {
            player2Health -= 10;
            player2HealthDisplay.textContent = player2Health;
        }

        // Verificar si algún jugador perdió
        if (player1Health <= 0) {
            alert("¡Jugador 2 gana!");
            resetGame();
        } else if (player2Health <= 0) {
            alert("¡Jugador 1 gana!");
            resetGame();
        }
    }
}

function updatePositions() {
    player1.style.left = `${player1Position.x}px`;
    player1.style.top = `${player1Position.y}px`;

    player2.style.left = `${player2Position.x}px`;
    player2.style.top = `${player2Position.y}px`;
}

function resetGame() {
    // Reiniciar la vida
    player1Health = 100;
    player2Health = 100;
    player1HealthDisplay.textContent = player1Health;
    player2HealthDisplay.textContent = player2Health;

    // Reiniciar las posiciones
    player1Position = { x: 20, y: 0 };
    player2Position = { x: gameAreaWidth - 70, y: 0 };
    updatePositions();
}
