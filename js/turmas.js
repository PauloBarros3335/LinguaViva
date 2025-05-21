// document.addEventListener("DOMContentLoaded", function () {
//   const idiomaFilter = document.getElementById("idiomaFilter");
//   const nivelFilter = document.getElementById("nivelFilter");
//   const filtrarBtn = document.getElementById("filtrarBtn");
//   const turmasTable = document.getElementById("turmasTable");

//   // Carregar filtros
//   function carregarFiltros() {
//     const idiomas = [...new Set(escola.cursos.map((c) => c.idioma))];
//     const niveis = [...new Set(escola.cursos.map((c) => c.nivel))];

//     idiomaFilter.innerHTML = '<option value="">Todos os idiomas</option>';
//     nivelFilter.innerHTML = '<option value="">Todos os níveis</option>';

//     idiomas.forEach((idioma) => {
//       const option = document.createElement("option");
//       option.value = idioma;
//       option.textContent = idioma;
//       idiomaFilter.appendChild(option);
//     });

//     niveis.forEach((nivel) => {
//       const option = document.createElement("option");
//       option.value = nivel;
//       option.textContent = nivel;
//       nivelFilter.appendChild(option);
//     });
//   }

//   // Carregar turmas
//   function carregarTurmas(idioma = "", nivel = "") {
//     turmasTable.innerHTML = `
//             <thead>
//                 <tr>
//                     <th>Idioma</th>
//                     <th>Nível</th>
//                     <th>Professor</th>
//                     <th>Alunos Matriculados</th>
//                 </tr>
//             </thead>
//             <tbody></tbody>
//         `;

//     const tbody = turmasTable.querySelector("tbody");

//     const cursosFiltrados = escola.cursos.filter((curso) => {
//       return (
//         (!idioma || curso.idioma === idioma) &&
//         (!nivel || curso.nivel === nivel)
//       );
//     });

//     if (cursosFiltrados.length === 0) {
//       const row = document.createElement("tr");
//       row.innerHTML =
//         '<td colspan="4">Nenhum curso encontrado com os filtros selecionados</td>';
//       tbody.appendChild(row);
//       return;
//     }

//     cursosFiltrados.forEach((curso) => {
//       const row = document.createElement("tr");

//       row.innerHTML = `
//                 <td>${curso.idioma}</td>
//                 <td>${curso.nivel}</td>
//                 <td>${curso.professor.nome}</td>
//                 <td>${curso.matriculas.length}</td>
//             `;

//       row.addEventListener("click", () => {
//         mostrarDetalhesTurma(curso);
//       });

//       tbody.appendChild(row);
//     });
//   }

//   // Mostrar detalhes da turma
//   function mostrarDetalhesTurma(curso) {
//     const modal = document.createElement("div");
//     modal.className = "modal";
//     modal.innerHTML = `
//             <div class="modal-content">
//                 <span class="close">&times;</span>
//                 <h2>${curso.idioma} - ${curso.nivel}</h2>
//                 <p>Professor: ${curso.professor.nome}</p>
//                 <h3>Alunos Matriculados (${curso.matriculas.length})</h3>
//                 <ul>
//                     ${curso.matriculas
//                       .map(
//                         (m) => `
//                         <li>${m.aluno.nome} (${formatarCPF(
//                           m.aluno.cpf
//                         )}) - Matrícula: ${m.data}</li>
//                     `
//                       )
//                       .join("")}
//                 </ul>
//             </div>
//         `;

//     modal.querySelector(".close").addEventListener("click", () => {
//       modal.remove();
//     });

//     document.body.appendChild(modal);
//   }

//   // Event listeners
//   filtrarBtn.addEventListener("click", () => {
//     const idioma = idiomaFilter.value;
//     const nivel = nivelFilter.value;
//     carregarTurmas(idioma, nivel);
//   });

//   // Inicialização
//   carregarFiltros();
//   carregarTurmas();
// });

document.addEventListener("DOMContentLoaded", function () {
  const idiomaFilter = document.getElementById("idiomaFilter");
  const nivelFilter = document.getElementById("nivelFilter");
  const filtrarBtn = document.getElementById("filtrarBtn");
  const turmasTable = document.getElementById("turmasTable");

  function carregarFiltros() {
    const idiomas = [...new Set(escola.cursos.map((c) => c.idioma))];
    const niveis = [...new Set(escola.cursos.map((c) => c.nivel))];

    idiomaFilter.innerHTML = '<option value="">Todos os idiomas</option>';
    nivelFilter.innerHTML = '<option value="">Todos os níveis</option>';

    idiomas.forEach((idioma) => {
      const option = document.createElement("option");
      option.value = idioma;
      option.textContent = idioma;
      idiomaFilter.appendChild(option);
    });

    niveis.forEach((nivel) => {
      const option = document.createElement("option");
      option.value = nivel;
      option.textContent = nivel;
      nivelFilter.appendChild(option);
    });
  }

  function carregarTurmas(idioma = "", nivel = "") {
    turmasTable.innerHTML = `
            <thead>
                <tr>
                    <th>Idioma</th>
                    <th>Nível</th>
                    <th>Professor</th>
                    <th>Alunos Matriculados</th>
                </tr>
            </thead>
            <tbody></tbody>
        `;

    const tbody = turmasTable.querySelector("tbody");

    const cursosFiltrados = escola.cursos.filter((curso) => {
      return (
        (!idioma || curso.idioma === idioma) &&
        (!nivel || curso.nivel === nivel)
      );
    });

    if (cursosFiltrados.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML =
        '<td colspan="4">Nenhum curso encontrado com os filtros selecionados</td>';
      tbody.appendChild(row);
      return;
    }

    cursosFiltrados.forEach((curso) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${curso.idioma}</td>
                <td>${curso.nivel}</td>
                <td>${curso.professor.nome}</td>
                <td>${curso.matriculas.length}</td>
            `;
      tbody.appendChild(row);
    });
  }

  // Inicializar
  carregarFiltros();
  carregarTurmas();

  // Filtro
  filtrarBtn.addEventListener("click", function () {
    const idiomaSelecionado = idiomaFilter.value;
    const nivelSelecionado = nivelFilter.value;
    carregarTurmas(idiomaSelecionado, nivelSelecionado);
  });
});
function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d)/, "$1.$2.$3-$4");
}
