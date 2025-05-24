document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("matriculaForm");
  const alunoSelect = document.getElementById("aluno");
  const cursoSelect = document.getElementById("curso");

  // Carregar alunos e cursos nos selects
  function carregarAlunosECursos() {
    alunoSelect.innerHTML = '<option value="">Selecione um aluno</option>';
    cursoSelect.innerHTML = '<option value="">Selecione um curso</option>';

    escola.alunos.forEach((aluno) => {
      const option = document.createElement("option");
      option.value = aluno.cpf;
      option.textContent = `${aluno.nome} (${formatarCPF(aluno.cpf)})`;
      alunoSelect.appendChild(option);
    });

    escola.cursos.forEach((curso) => {
      const option = document.createElement("option");
      option.value = `${curso.idioma}-${curso.nivel}`;
      option.textContent = `${curso.idioma} - ${curso.nivel} (Prof. ${curso.professor.nome})`;
      cursoSelect.appendChild(option);
    });
  }

  carregarAlunosECursos();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const alunoCPF = alunoSelect.value;
    const cursoId = cursoSelect.value;

    // Validações
    if (!alunoCPF) {
      mostrarMensagem("Aluno é obrigatório", "error");
      return;
    }

    if (!cursoId) {
      mostrarMensagem("Curso é obrigatório", "error");
      return;
    }

    // Buscar aluno e curso
    const aluno = escola.buscarAlunoPorCPF(alunoCPF);
    if (!aluno) {
      mostrarMensagem("Aluno não encontrado", "error");
      return;
    }

    const [idioma, nivel] = cursoId.split("-");
    const curso = escola.buscarCursoPorIdiomaENivel(idioma, nivel);
    if (!curso) {
      mostrarMensagem("Curso não encontrado", "error");
      return;
    }

    // Verificar se aluno já está matriculado (usando a referência simplificada)
    const jaMatriculado = aluno.matriculas.some((m) => m.cursoId === cursoId);

    if (jaMatriculado) {
      mostrarMensagem("Aluno já matriculado neste curso", "error");
      return;
    }

    // Realizar matrícula
    const matricula = new Matricula(aluno, curso);
    escola.matricularAluno(matricula);

    mostrarMensagem("Matrícula realizada com sucesso!");
    form.reset();

    // Atualizar a lista (opcional)
    carregarAlunosECursos();
  });
});
