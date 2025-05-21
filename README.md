# LinguaViva - Sistema de Gestão Escolar

## Descrição
O LinguaViva é um sistema de gestão escolar para a escola de idiomas LinguaViva. O sistema permite o cadastro de alunos, professores e cursos, além da matrícula de alunos em diferentes cursos. O projeto é desenvolvido utilizando JavaScript e armazena dados no navegador através do `localStorage`.

## Funcionalidades
- **Cadastro de Alunos**: Permite o registro de alunos com nome, CPF e e-mail.
- **Cadastro de Professores**: Permite o registro de professores com nome, idiomas que ensinam e e-mail.
- **Cadastro de Cursos**: Permite o registro de cursos com idioma, nível e professor responsável.
- **Matrículas**: Alunos podem se matricular em cursos disponíveis.
- **Visualização de Turmas**: Exibe alunos matriculados em cursos com opções de filtro por idioma e nível.
- **Login Simples**: Sistema de login com autenticação básica para acesso ao sistema.
- **Logout Automático**: Logout após 1 minuto de inatividade.

## Estrutura do Projeto

/lingua-viva
│
├── index.html # Tela de login
├── landing.html # Página inicial após login
├── cadastro-aluno.html # Cadastro de alunos
├── cadastro-professor.html # Cadastro de professores
├── cadastro-curso.html # Cadastro de cursos
├── matricula.html # Matrícula de alunos
├── turmas.html # Visualização de turmas
│
├── css/ # Arquivos de estilo
│ └── style.css
│
├── js/ # Scripts JavaScript
│ ├── classes.js # Definições de classes
│ ├── utils.js # Funções utilitárias
│ ├── alunos.js # Lógica de alunos
│ ├── professores.js # Lógica de professores
│ ├── cursos.js # Lógica de cursos
│ └── matriculas.js # Lógica de matrículas
│
└── assets/ # Imagens e ícones (se necessário)


## Tecnologias Utilizadas
- HTML
- CSS
- JavaScript
- localStorage

## Instalação
1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>


   Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir issues para melhorias.

Licença
Este projeto é de código aberto e pode ser utilizado e modificado conforme necessário.

Copiar

### Personalizações
Sinta-se à vontade para personalizar o README conforme necessário, adicionando informações específicas sobre o seu projeto, como instruções de uso, screenshots ou quaisquer detalhes que julgar importantes. Se precisar de mais alguma coisa, é só avisar!



