document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("cadastroCursoForm");
  const professorSelect = document.getElementById("professor");

  // Carregar professores no select
  function carregarProfessores() {
    professorSelect.innerHTML =
      '<option value="">Selecione um professor</option>';

    escola.professores.forEach((professor) => {
      const option = document.createElement("option");
      option.value = professor.email;
      option.textContent = `${professor.nome} (${professor.idiomas.join(
        ", "
      )})`;
      professorSelect.appendChild(option);
    });
  }

  carregarProfessores();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const idioma = document.getElementById("idioma").value;
    const nivel = document.getElementById("nivel").value;
    const professorEmail = professorSelect.value;

    // Validações
    if (!idioma) {
      mostrarMensagem("Idioma é obrigatório", "error");
      return;
    }

    if (!nivel) {
      mostrarMensagem("Nível é obrigatório", "error");
      return;
    }

    if (!professorEmail) {
      mostrarMensagem("Professor é obrigatório", "error");
      return;
    }

    // Verificar se curso já existe
    if (escola.buscarCursoPorIdiomaENivel(idioma, nivel)) {
      mostrarMensagem("Curso já cadastrado para este idioma e nível", "error");
      return;
    }

    // Buscar professor
    const professor = escola.buscarProfessorPorEmail(professorEmail);
    if (!professor) {
      mostrarMensagem("Professor não encontrado", "error");
      return;
    }

    // Verificar se professor ensina o idioma
    if (!professor.idiomas.includes(idioma)) {
      mostrarMensagem(
        "Este professor não ensina o idioma selecionado",
        "error"
      );
      return;
    }

    // Criar e adicionar curso
    const curso = new Curso(idioma, nivel, professor);
    escola.adicionarCurso(curso);
    professor.cursos.push(curso);

    mostrarMensagem("Curso cadastrado com sucesso!");
    form.reset();
  });
});
