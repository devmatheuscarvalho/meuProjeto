// Validação do e-mail, chamada quando o usuário sai do campo (onblur).
// O método test() devolve true se o texto combina com a regex. O ! inverte:
// entra no if quando o e-mail NÃO é válido. A borda do campo fica vermelha
// no erro e verde no acerto.
function validarEmail() {
  const campo = document.getElementById("resemail");
  const mensagem = document.getElementById("erro-email");

  if (!regexEmail.test(campo.value)) {
    mostrarAlerta(
      mensagem,
      "erro",
      "E-mail inválido. Ex: usuario@dominio.com",
    );
    campo.style.borderColor = "#ff4d4d";
  } else {
    mostrarAlerta(mensagem, "sucesso", "E-mail válido");
    campo.style.borderColor = "#00e676";
  }
}

// Mesma ideia da validação de e-mail, mas usando a regex de senha forte.
function validarSenha() {
  const campo = document.getElementById("ressenha");
  const mensagem = document.getElementById("erro-senha");

  if (!regexSenha.test(campo.value)) {
    mostrarAlerta(
      mensagem,
      "erro",
      "Mínimo 8 caracteres, com maiúscula, minúscula, número e símbolo (#?!@$%^&*-).",
    );
    campo.style.borderColor = "#ff4d4d";
  } else {
    mostrarAlerta(mensagem, "sucesso", "Senha válida");
    campo.style.borderColor = "#00e676";
  }
}

// Executada ao clicar em "Acessar". O event.preventDefault() impede o
// formulário de recarregar a página, para podermos validar antes. Os dois
// campos são validados de uma vez, para mostrar todos os erros juntos. Se
// tudo estiver certo, o navegador vai para a home.
function acessar(event) {
  event.preventDefault();

  const emailValido = regexEmail.test(
    document.getElementById("resemail").value,
  );
  const senhaValida = regexSenha.test(
    document.getElementById("ressenha").value,
  );

  validarEmail();
  validarSenha();

  if (emailValido && senhaValida) {
    window.location.href = "home.html";
  }
}
