document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastroAlunoForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;

    // Validações
    if (!nome) {
      mostrarMensagem("Nome é obrigatório", "error");
      return;
    }

    if (!validarCPF(cpf)) {
      mostrarMensagem("CPF inválido", "error");
      return;
    }

    if (!validarEmail(email)) {
      mostrarMensagem("Email inválido", "error");
      return;
    }

    // Verificar se aluno já existe
    if (escola.buscarAlunoPorCPF(cpf)) {
      mostrarMensagem("Aluno já cadastrado com este CPF", "error");
      return;
    }

    // Criar e adicionar aluno
    const aluno = new Aluno(nome, cpf, email);
    escola.adicionarAluno(aluno);

    mostrarMensagem("Aluno cadastrado com sucesso!");
    form.reset();
  });
});
