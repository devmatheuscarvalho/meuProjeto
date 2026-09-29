// Valida o e-mail digitado, com a regex compartilhada em validacao.js.
function validarEmailRecuperacao() {
  const campo = document.getElementById("email-recuperar");
  const mensagem = document.getElementById("erro-email-recuperar");

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

// Executada ao clicar em "Enviar link". Valida o e-mail e, se estiver correto,
// troca o formulário pela mensagem de confirmação. O return dentro do if
// interrompe a função quando o e-mail é inválido.
function enviarRecuperacao(event) {
  event.preventDefault();

  const campo = document.getElementById("email-recuperar");
  const emailValido = regexEmail.test(campo.value);

  validarEmailRecuperacao();

  if (!emailValido) {
    return;
  }

  // Em um sistema real, aqui seria chamado o servidor para enviar o e-mail.
  // Por enquanto, só mostramos na tela o e-mail digitado.
  document.getElementById("email-enviado").textContent = campo.value;
  document.getElementById("form-recuperar").classList.add("escondido");
  document.getElementById("confirmacao-envio").classList.remove("escondido");
}
