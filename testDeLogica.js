function invertirCadena(cadena) {
  const caracteres = cadena.split("");
  let izquierda = 0;
  let derecha = caracteres.length - 1;

  while (izquierda < derecha) {
    if (!/[a-zA-Z]/.test(caracteres[izquierda])) {
      izquierda++;
    } else if (!/[a-zA-Z]/.test(caracteres[derecha])) {
      derecha--;
    } else {
      [caracteres[izquierda], caracteres[derecha]] = [
        caracteres[derecha],
        caracteres[izquierda],
      ];
      izquierda++;
      derecha--;
    }
  }

  return caracteres.join("");
}

const entrada = "a,b$c";
const salida = invertirCadena(entrada);
console.log("Entrada:", entrada);
console.log("Salida:", salida);
