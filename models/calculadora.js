function somar(numero1, numero2) {
  if (numero1 == null) {
    numero1 = 0;
  }

  if (numero2 == null) {
    numero2 = 0;
  }

  if (typeof numero1 != "number" || typeof numero2 != "number") {
    return "Erro";
  }

  return numero1 + numero2;
}

function subtrair(numero1, numero2) {
  if (numero1 == null) {
    numero1 = 0;
  }

  if (numero2 == null) {
    numero2 = 0;
  }

  if (typeof numero1 != "number" || typeof numero2 != "number") {
    return "Erro";
  }

  return numero1 - numero2;
}

exports.somar = somar;
exports.subtrair = subtrair;
