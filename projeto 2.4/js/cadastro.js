// Valida o nome: o trim() tira espaços do começo e do fim, e o nome precisa
// ter pelo menos 3 letras.
function validarNome() {
  const campo = document.getElementById("nome-cadastro");
  const mensagem = document.getElementById("erro-nome");

  if (campo.value.trim().length < 3) {
    mostrarAlerta(mensagem, "erro", "Digite seu nome completo.");
    campo.style.borderColor = "#ff4d4d";
  } else {
    mostrarAlerta(mensagem, "sucesso", "Nome válido");
    campo.style.borderColor = "#00e676";
  }
}

// Máscara de telefone no formato (00) 00000-0000, aplicada enquanto o usuário
// digita (evento oninput). O event.target é o próprio campo que disparou o evento.
function aplicarMascaraTelefone(event) {
  const campo = event.target;
  // Passo 1: replace(/\D/g, "") remove tudo que não é número (\D significa
  // "não dígito" e o g aplica em todo o texto). O slice(0, 11) guarda no máximo
  // 11 números.
  let numeros = campo.value.replace(/\D/g, "").slice(0, 11);

  // Passo 2: monta a máscara conforme a quantidade de números já digitados.
  // No replace, os grupos entre parênteses viram $1, $2 e $3 e são reorganizados
  // com os símbolos: ($1) $2-$3. Com 11 números (celular) o hífen vem depois do
  // 5º dígito; com menos de 11 (fixo, ou celular ainda sendo digitado) vem
  // depois do 4º.
  if (numeros.length > 10) {
    numeros = numeros.replace(/^(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  } else if (numeros.length > 6) {
    numeros = numeros.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else if (numeros.length > 2) {
    numeros = numeros.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  } else if (numeros.length > 0) {
    numeros = numeros.replace(/^(\d{0,2})/, "($1");
  }

  campo.value = numeros;
}

// Valida o telefone contando só os números. Aceita 10 (fixo) ou 11 (celular).
function validarTelefone() {
  const campo = document.getElementById("telefone-cadastro");
  const mensagem = document.getElementById("erro-telefone");
  const numeros = campo.value.replace(/\D/g, "");

  if (numeros.length < 10 || numeros.length > 11) {
    mostrarAlerta(
      mensagem,
      "erro",
      "Telefone inválido. Ex: (24) 99999-9999",
    );
    campo.style.borderColor = "#ff4d4d";
  } else {
    mostrarAlerta(mensagem, "sucesso", "Telefone válido");
    campo.style.borderColor = "#00e676";
  }
}

// Valida o e-mail com a regex compartilhada em validacao.js.
function validarEmailCadastro() {
  const campo = document.getElementById("email-cadastro");
  const mensagem = document.getElementById("erro-email-cadastro");

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

// Valida a senha com a regex de senha forte.
function validarSenhaCadastro() {
  const campo = document.getElementById("senha-cadastro");
  const mensagem = document.getElementById("erro-senha-cadastro");

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

  // A confirmação depende da senha, então ela é revalidada sempre que a senha
  // muda.
  validarConfirmarSenha();
}

// Compara a confirmação com a senha. Se o campo estiver vazio, a mensagem é
// limpa em vez de mostrar erro.
function validarConfirmarSenha() {
  const senha = document.getElementById("senha-cadastro").value;
  const campo = document.getElementById("confirmar-senha-cadastro");
  const mensagem = document.getElementById("erro-confirmar-senha");

  if (campo.value.length === 0) {
    mensagem.className = "";
    mensagem.innerHTML = "";
    return;
  }

  if (campo.value !== senha) {
    mostrarAlerta(mensagem, "erro", "As senhas não coincidem.");
    campo.style.borderColor = "#ff4d4d";
  } else {
    mostrarAlerta(mensagem, "sucesso", "As senhas coincidem");
    campo.style.borderColor = "#00e676";
  }
}

// Executada ao clicar em "Criar conta". Primeiro guarda em variáveis (true ou
// false) se cada campo é válido; depois chama as validações para exibir as
// mensagens na tela. O preventDefault() impede o envio padrão do formulário.
function cadastrar(event) {
  event.preventDefault();

  const nomeValido =
    document.getElementById("nome-cadastro").value.trim().length >= 3;
  const emailValido = regexEmail.test(
    document.getElementById("email-cadastro").value,
  );
  const numerosTelefone = document
    .getElementById("telefone-cadastro")
    .value.replace(/\D/g, "");
  const telefoneValido =
    numerosTelefone.length >= 10 && numerosTelefone.length <= 11;
  const senha = document.getElementById("senha-cadastro").value;
  const senhaValida = regexSenha.test(senha);
  const senhasIguais =
    senha === document.getElementById("confirmar-senha-cadastro").value;

  validarNome();
  validarEmailCadastro();
  validarTelefone();
  validarSenhaCadastro();

  // Só se todos os campos estiverem válidos o formulário é escondido e a
  // mensagem de confirmação aparece (adicionando e removendo a classe "escondido").
  // Como não há servidor, a criação da conta é apenas simulada.
  if (
    nomeValido &&
    emailValido &&
    telefoneValido &&
    senhaValida &&
    senhasIguais
  ) {
    document.getElementById("form-cadastro").classList.add("escondido");
    document
      .getElementById("confirmacao-cadastro")
      .classList.remove("escondido");
  }
}
