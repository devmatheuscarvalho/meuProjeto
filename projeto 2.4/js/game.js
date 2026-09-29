// Troca a imagem principal da página do jogo pela miniatura clicada.
//   miniatura: a imagem clicada (passada pelo onclick com a palavra this)
function trocarImagem(miniatura) {
  const imagemPrincipal = document.getElementById("imagem-principal");
  const miniaturas = document.querySelectorAll(".miniaturas-detalhe img");

  // Copia o endereço da miniatura para a imagem principal.
  imagemPrincipal.src = miniatura.src;

  // Destaca a miniatura escolhida: primeiro tira a marca de todas e depois
  // adiciona a classe "selecionada" só na clicada.
  for (let i = 0; i < miniaturas.length; i++) {
    miniaturas[i].classList.remove("selecionada");
  }
  miniatura.classList.add("selecionada");
}
