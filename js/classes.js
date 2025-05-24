class Pessoa {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }
}

class Aluno extends Pessoa {
  constructor(nome, cpf, email) {
    super(nome, email);
    this.cpf = cpf;
    this.matriculas = [];
  }
}

class Professor extends Pessoa {
  constructor(nome, email, idiomas) {
    super(nome, email);
    this.idiomas = Array.isArray(idiomas) ? idiomas : [idiomas];
    this.cursos = [];
  }
}

class Curso {
  constructor(idioma, nivel, professor) {
    this.idioma = idioma;
    this.nivel = nivel;
    this.professor = professor;
    this.matriculas = [];
  }

  get cursoId() {
    return `${this.idioma}-${this.nivel}`;
  }
}

class Matricula {
  constructor(aluno, curso, data = new Date().toISOString().split("T")[0]) {
    this.aluno = aluno;
    this.curso = curso;
    this.data = data;
    this.alunoCPF = aluno.cpf;
    this.cursoId = `${curso.idioma}-${curso.nivel}`;
  }
}

class Escola {
  constructor() {
    this.alunos = [];
    this.professores = [];
    this.cursos = [];
    this.matriculas = [];
  }

  adicionarAluno(aluno) {
    this.alunos.push(aluno);
    this.salvarDados();
  }

  adicionarProfessor(professor) {
    this.professores.push(professor);
    this.salvarDados();
  }

  adicionarCurso(curso) {
    this.cursos.push(curso);
    curso.professor.cursos.push(`${curso.idioma}-${curso.nivel}`);
    this.salvarDados();
  }

  matricularAluno(matricula) {
    const aluno = this.buscarAlunoPorCPF(matricula.alunoCPF);
    const curso = this.buscarCursoPorIdiomaENivel(
      matricula.curso.idioma,
      matricula.curso.nivel
    );

    if (!aluno || !curso) return;

    // Verifica se já está matriculado
    const jaMatriculado = aluno.matriculas.some(
      (m) => m.cursoId === matricula.cursoId
    );
    if (jaMatriculado) return;

    // Adiciona no array de matrículas
    this.matriculas.push(matricula);

    // Referência no aluno
    aluno.matriculas.push({
      cursoId: matricula.cursoId,
      data: matricula.data,
    });

    // Referência no curso
    curso.matriculas.push({
      alunoCPF: matricula.alunoCPF,
      data: matricula.data,
    });

    this.salvarDados();
  }

  buscarAlunoPorCPF(cpf) {
    return this.alunos.find((a) => a.cpf === cpf);
  }

  buscarProfessorPorEmail(email) {
    return this.professores.find((p) => p.email === email);
  }

  buscarCursoPorIdiomaENivel(idioma, nivel) {
    return this.cursos.find((c) => c.idioma === idioma && c.nivel === nivel);
  }

  salvarDados() {
    const dadosParaSalvar = {
      alunos: this.alunos.map((aluno) => ({
        nome: aluno.nome,
        cpf: aluno.cpf,
        email: aluno.email,
        matriculas: aluno.matriculas,
      })),
      professores: this.professores.map((prof) => ({
        nome: prof.nome,
        email: prof.email,
        idiomas: prof.idiomas,
        cursos: prof.cursos,
      })),
      cursos: this.cursos.map((curso) => ({
        idioma: curso.idioma,
        nivel: curso.nivel,
        professorEmail: curso.professor.email,
        matriculas: curso.matriculas,
      })),
      matriculas: this.matriculas.map((mat) => ({
        alunoCPF: mat.alunoCPF,
        cursoId: mat.cursoId,
        data: mat.data,
      })),
    };

    localStorage.setItem("escolaData", JSON.stringify(dadosParaSalvar));
  }

  carregarDados() {
    const dados = JSON.parse(localStorage.getItem("escolaData")) || {};

    this.alunos = [];
    this.professores = [];
    this.cursos = [];
    this.matriculas = [];

    if (dados.professores) {
      this.professores = dados.professores.map((profData) => {
        const prof = new Professor(
          profData.nome,
          profData.email,
          profData.idiomas
        );
        prof.cursos = profData.cursos || [];
        return prof;
      });
    }

    if (dados.alunos) {
      this.alunos = dados.alunos.map((alunoData) => {
        const aluno = new Aluno(alunoData.nome, alunoData.cpf, alunoData.email);
        aluno.matriculas = alunoData.matriculas || [];
        return aluno;
      });
    }

    if (dados.cursos) {
      this.cursos = dados.cursos
        .map((cursoData) => {
          const prof = this.professores.find(
            (p) => p.email === cursoData.professorEmail
          );
          if (!prof) return null;

          const curso = new Curso(cursoData.idioma, cursoData.nivel, prof);
          curso.matriculas = cursoData.matriculas || [];
          return curso;
        })
        .filter(Boolean);
    }

    if (dados.matriculas) {
      this.matriculas = dados.matriculas
        .map((matData) => {
          const aluno = this.alunos.find((a) => a.cpf === matData.alunoCPF);
          const [idioma, nivel] = matData.cursoId.split("-");
          const curso = this.cursos.find(
            (c) => c.idioma === idioma && c.nivel === nivel
          );
          if (!aluno || !curso) return null;

          return new Matricula(aluno, curso, matData.data);
        })
        .filter(Boolean);
    }
  }
}

// Instancia a escola e carrega os dados ao iniciar
const escola = new Escola();
escola.carregarDados();
