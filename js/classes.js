// class Pessoa {
//   constructor(nome, email) {
//     this.nome = nome;
//     this.email = email;
//   }
// }

// class Aluno extends Pessoa {
//   constructor(nome, cpf, email) {
//     super(nome, email);
//     this.cpf = cpf;
//     this.matriculas = [];
//   }
// }

// class Professor extends Pessoa {
//   constructor(nome, email, idiomas) {
//     super(nome, email);
//     this.idiomas = Array.isArray(idiomas) ? idiomas : [idiomas];
//     this.cursos = [];
//   }
// }

// class Curso {
//   constructor(idioma, nivel, professor) {
//     this.idioma = idioma;
//     this.nivel = nivel;
//     this.professor = professor;
//     this.matriculas = [];
//   }
// }

// class Matricula {
//   constructor(aluno, curso, data = new Date().toISOString().split("T")[0]) {
//     this.aluno = aluno;
//     this.curso = curso;
//     this.data = data;
//   }
// }

// class Escola {
//   constructor() {
//     this.alunos = [];
//     this.professores = [];
//     this.cursos = [];
//     this.matriculas = [];
//   }

//   // Métodos para adicionar entidades
//   adicionarAluno(aluno) {
//     this.alunos.push(aluno);
//     this.salvarDados();
//   }

//   adicionarProfessor(professor) {
//     this.professores.push(professor);
//     this.salvarDados();
//   }

//   adicionarCurso(curso) {
//     this.cursos.push(curso);
//     this.salvarDados();
//   }

//   matricularAluno(matricula) {
//     this.matriculas.push(matricula);
//     matricula.aluno.matriculas.push(matricula);
//     matricula.curso.matriculas.push(matricula);
//     this.salvarDados();
//   }

//   // Métodos para buscar entidades
//   buscarAlunoPorCPF(cpf) {
//     return this.alunos.find((a) => a.cpf === cpf);
//   }

//   buscarProfessorPorEmail(email) {
//     return this.professores.find((p) => p.email === email);
//   }

//   buscarCursoPorIdiomaENivel(idioma, nivel) {
//     return this.cursos.find((c) => c.idioma === idioma && c.nivel === nivel);
//   }

//   // Métodos para carregar/salvar dados
//   salvarDados() {
//     localStorage.setItem(
//       "escolaData",
//       JSON.stringify({
//         alunos: this.alunos,
//         professores: this.professores,
//         cursos: this.cursos,
//         matriculas: this.matriculas,
//       })
//     );
//   }

//   carregarDados() {
//     const dados = JSON.parse(localStorage.getItem("escolaData")) || {};
//     this.alunos = dados.alunos || [];
//     this.professores = dados.professores || [];
//     this.cursos = dados.cursos || [];
//     this.matriculas = dados.matriculas || [];
//   }
// }

// const escola = new Escola();
// escola.carregarDados();

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
    this.matriculas = []; // Armazena referências simplificadas
  }
}

class Professor extends Pessoa {
  constructor(nome, email, idiomas) {
    super(nome, email);
    this.idiomas = Array.isArray(idiomas) ? idiomas : [idiomas];
    this.cursos = []; // Armazena referências simplificadas
  }
}

class Curso {
  constructor(idioma, nivel, professor) {
    this.idioma = idioma;
    this.nivel = nivel;
    this.professor = professor;
    this.matriculas = []; // Armazena referências simplificadas
  }
}

class Matricula {
  constructor(aluno, curso, data = new Date().toISOString().split("T")[0]) {
    this.aluno = aluno;
    this.curso = curso;
    this.data = data;
    this.alunoCPF = aluno.cpf; // Referência simples
    this.cursoId = `${curso.idioma}-${curso.nivel}`; // Referência simples
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
    this.matriculas.push(matricula);

    // Armazena apenas referências necessárias
    matricula.aluno.matriculas.push({
      cursoId: matricula.cursoId,
      data: matricula.data,
    });

    matricula.curso.matriculas.push({
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

    // Limpar dados atuais
    this.alunos = [];
    this.professores = [];
    this.cursos = [];
    this.matriculas = [];

    // Reconstruir professores primeiro (são necessários para os cursos)
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

    // Reconstruir alunos
    if (dados.alunos) {
      this.alunos = dados.alunos.map((alunoData) => {
        const aluno = new Aluno(alunoData.nome, alunoData.cpf, alunoData.email);
        aluno.matriculas = alunoData.matriculas || [];
        return aluno;
      });
    }

    // Reconstruir cursos
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

    // Reconstruir matrículas
    if (dados.matriculas) {
      this.matriculas = dados.matriculas
        .map((matData) => {
          const aluno = this.alunos.find((a) => a.cpf === matData.alunoCPF);
          const curso = this.cursos.find((c) => c.cursoId === matData.cursoId);

          if (!aluno || !curso) return null;

          const matricula = new Matricula(aluno, curso, matData.data);
          return matricula;
        })
        .filter(Boolean);
    }
  }
}

const escola = new Escola();
escola.carregarDados();
