window.onload = () => {
    "use strict";
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js");
    }
  };


  const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';
let gameEnded = false;

// Função para verificar o vencedor
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]            // Diagonais
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return cells[a].textContent;
        }
    }

    return null;
}

// Função para reiniciar o jogo
function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });

    gameEnded = false;
    currentPlayer = 'X';
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!gameEnded && !cell.textContent) {
            cell.textContent = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                gameEnded = true;
                alert(`Jogador ${winner} venceu!`);
                resetGame();
            } else if ([...cells].every(cell => cell.textContent !== '')) {
                gameEnded = true;
                alert("Empate!");
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    });
});
