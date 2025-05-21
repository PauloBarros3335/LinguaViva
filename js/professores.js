document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastroProfessorForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const idiomas = Array.from(
      document.getElementById("idiomas").selectedOptions
    ).map((option) => option.value);

    // Validações
    if (!nome) {
      mostrarMensagem("Nome é obrigatório", "error");
      return;
    }

    if (!validarEmail(email)) {
      mostrarMensagem("Email inválido", "error");
      return;
    }

    if (idiomas.length === 0) {
      mostrarMensagem("Selecione pelo menos um idioma", "error");
      return;
    }

    // Verificar se professor já existe
    if (escola.buscarProfessorPorEmail(email)) {
      mostrarMensagem("Professor já cadastrado com este email", "error");
      return;
    }

    // Criar e adicionar professor
    const professor = new Professor(nome, email, idiomas);
    escola.adicionarProfessor(professor);

    mostrarMensagem("Professor cadastrado com sucesso!");
    form.reset();
  });
});
