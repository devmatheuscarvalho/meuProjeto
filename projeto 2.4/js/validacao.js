// Este arquivo reúne o que é comum às telas de login, cadastro e recuperação
// de senha. Ele é carregado antes dos outros scripts porque eles usam o que
// está declarado aqui.
// 
// Regex (expressão regular) de e-mail, lida em partes:
//   ^[a-zA-Z0-9._%+-]+  começo do texto, com letras, números e . _ % + -
//   @                   precisa ter um arroba
//   [a-zA-Z0-9.-]+      o domínio (ex.: gmail)
//   \.[a-zA-Z]{2,}$      um ponto e pelo menos 2 letras (ex.: .com) até o fim
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Regex de senha forte. Cada (?=...) é uma condição que precisa ser verdadeira:
//   (?=.*[a-z])          ao menos uma letra minúscula
//   (?=.*[A-Z])          ao menos uma letra maiúscula
//   (?=.*\d)             ao menos um número
//   (?=.*[#?!@$%^&*-])   ao menos um símbolo
//   .{8,}                no mínimo 8 caracteres no total
const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,}$/;

// Mostra uma mensagem de erro ou de sucesso abaixo de um campo.
//   elemento: o span onde a mensagem aparece
//   tipo: "erro" ou "sucesso" (define o ícone e a classe de cor no CSS)
//   texto: a mensagem que será exibida
function mostrarAlerta(elemento, tipo, texto) {
  const icone = tipo === "erro" ? "error" : "check_circle";
  elemento.innerHTML = `<span class="material-icons">${icone}</span> ${texto}`;
  elemento.className = `alerta alerta-${tipo}`;
}

// Alterna um campo de senha entre visível e oculto, trocando o type do
// input entre "password" e "text" e mudando o ícone do olho.
//   idInput: id do campo de senha
//   idBotao: id do botão que contém o ícone
function alternarSenha(idInput, idBotao) {
  const input = document.getElementById(idInput);
  const icone = document.querySelector(`#${idBotao} .material-icons`);

  if (input.type === "password") {
    input.type = "text";
    icone.textContent = "visibility";
  } else {
    input.type = "password";
    icone.textContent = "visibility_off";
  }
}
