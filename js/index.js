window.onload = () => {
    "use strict";
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js");
    }
  };

  const celulas = document.querySelectorAll('.celula');
  let jogadorAtual = 'Palmeiras';
  let partidaEncerrada = false;
  
  // Função para verificar o vencedor
  function verificarVencedor() {
      const combinacoesVencedoras = [
          [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
          [0, 4, 8], [2, 4, 6]            // Diagonais
      ];
  
      for (const combinacao of combinacoesVencedoras) {
          const [a, b, c] = combinacao;
          const celulaA = celulas[a];
          const celulaB = celulas[b];
          const celulaC = celulas[c];
  
          if (celulaA.dataset.jogador === jogadorAtual &&
              celulaB.dataset.jogador === jogadorAtual &&
              celulaC.dataset.jogador === jogadorAtual) {
              return true;
          }
      }
  
      return false;
  }
  
  // Função para verificar empate
  function verificarEmpate() {
      return [...celulas].every(celula => celula.dataset.jogador !== 'vazio');
  }
  
  // Função para reiniciar a partida
  function reiniciarPartida() {
      celulas.forEach(celula => {
          celula.dataset.jogador = 'vazio';
          celula.style.backgroundImage = 'none';
      });
  
      partidaEncerrada = false;
      jogadorAtual = 'Palmeiras';
  }
  
  celulas.forEach(celula => {
      celula.addEventListener('click', () => {
          if (!partidaEncerrada && celula.dataset.jogador === 'vazio') {
              celula.dataset.jogador = jogadorAtual;
  
              if (jogadorAtual === 'Palmeiras') {
                  celula.style.backgroundImage = 'url("/images/pal.png")';
              } else {
                  celula.style.backgroundImage = 'url("/images/cor.png")';
              }
  
              if (verificarVencedor()) {
                  partidaEncerrada = true;
                  alert(`O ${jogadorAtual} venceu o clássico!`);
                  reiniciarPartida();
              } else if (verificarEmpate()) {
                  partidaEncerrada = true;
                  alert("O clássico terminou em empate!");
                  reiniciarPartida();
              } else {
                  jogadorAtual = jogadorAtual === 'Palmeiras' ? 'Corinthians' : 'Palmeiras';
              }
          }
      });
  });
  