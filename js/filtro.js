// Filtra os cards de jogos pela categoria clicada no menu.
//   categoria: nome da categoria (ex.: "fps") ou "todos"
//   botao: o botão clicado, usado para destacá-lo como ativo
function filtrarJogos(categoria, botao) {
  const jogos = document.querySelectorAll(".jogo");
  const botoes = document.querySelectorAll(".menu-categorias button");
  const aviso = document.getElementById("aviso-vazio");
  // Conta quantos jogos continuam visíveis, para saber se precisamos mostrar
  // a mensagem de "nenhum jogo".
  let visiveis = 0;

  // Percorre todos os cards. Se a categoria do card (atributo data-categoria)
  // for igual à escolhida, ou se o filtro for "todos", o card é mostrado.
  // Senão, é escondido com display: none. Ao usar display = "", o navegador
  // volta ao estilo original definido no CSS.
  for (let i = 0; i < jogos.length; i++) {
    const categoriaDoJogo = jogos[i].getAttribute("data-categoria");

    if (categoria === "todos" || categoriaDoJogo === categoria) {
      jogos[i].style.display = "";
      visiveis++;
    } else {
      jogos[i].style.display = "none";
    }
  }

  // Tira a marca de ativo de todos os botões e depois marca só o que foi clicado.
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].classList.remove("ativa");
  }
  botao.classList.add("ativa");

  // Se nenhum jogo ficou visível, mostra o aviso; caso contrário, esconde.
  if (visiveis === 0) {
    aviso.style.display = "block";
  } else {
    aviso.style.display = "none";
  }
}
