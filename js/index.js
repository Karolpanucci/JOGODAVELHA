window.onload = () => {
    "use strict";
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js");
    }
  };

  const cells = document.querySelectorAll('.cell');
  let currentPlayer = 'palmeiras';
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
          if (cells[a].classList.contains(currentPlayer) && cells[b].classList.contains(currentPlayer) && cells[c].classList.contains(currentPlayer)) {
              cells[a].classList.add('winning-cell');
              cells[b].classList.add('winning-cell');
              cells[c].classList.add('winning-cell');
              return true;
          }
      }
  
      return false;
  }
  
  // Função para reiniciar o jogo
  function resetGame() {
      cells.forEach(cell => {
          cell.classList.remove('palmeiras', 'corinthians', 'winning-cell');
      });
  
      gameEnded = false;
      currentPlayer = 'palmeiras';
  }
  
  cells.forEach(cell => {
      cell.addEventListener('click', () => {
          if (!gameEnded && !cell.classList.contains('palmeiras') && !cell.classList.contains('corinthians')) {
              cell.classList.add(currentPlayer);
  
              if (checkWinner()) {
                  gameEnded = true;
                  alert(`O time do ${currentPlayer === 'palmeiras' ? 'Palmeiras' : 'Corinthians'} venceu!`);
                  resetGame();
              } else if ([...cells].every(cell => cell.classList.contains('palmeiras') || cell.classList.contains('corinthians'))) {
                  gameEnded = true;
                  alert("Empate!");
                  resetGame();
              } else {
                  currentPlayer = currentPlayer === 'palmeiras' ? 'corinthians' : 'palmeiras';
              }
          }
      });
  });
  