const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');

const player1Speed = 10;
const player2Speed = 10;

const gameAreaWidth = window.innerWidth;
const gameAreaHeight = window.innerHeight;

let player1Position = { x: 20, y: 0 };
let player2Position = { x: gameAreaWidth - 70, y: 0 };

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
        case ' ': // Ataque
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
        case 'Enter': // Ataque
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
    }
}

function updatePositions() {
    player1.style.left = `${player1Position.x}px`;
    player1.style.top = `${player1Position.y}px`;

    player2.style.left = `${player2Position.x}px`;
    player2.style.top = `${player2Position.y}px`;
}
