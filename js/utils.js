// Validação de CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }

  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) return false;

  return true;
}

// Validação de Email
function validarEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

// Formatar CPF
function formatarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, "");
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// Mostrar mensagem de feedback
function mostrarMensagem(mensagem, tipo = "success") {
  const div = document.createElement("div");
  div.className = `alert alert-${tipo}`;
  div.textContent = mensagem;
  div.style.position = "fixed";
  div.style.top = "20px";
  div.style.left = "50%";
  div.style.transform = "translateX(-50%)";
  div.style.padding = "10px 20px";
  div.style.zIndex = "9999";
  div.style.borderRadius = "8px";
  div.style.fontWeight = "bold";
  div.style.color = "#fff";
  div.style.backgroundColor =
    tipo === "success" ? "#28a745" : tipo === "error" ? "#dc3545" : "#007bff";

  document.body.appendChild(div);

  setTimeout(() => div.remove(), 3000);
}
