const calculadora = require("../../models/calculadora.js");

test("somar", () => {
  var a, b;
  a = 2;
  b = 3;
  const resultado = calculadora.somar(a, b);
  expect(resultado).toBe(5);
});

test("banana + 5 retornar erro", () => {
  var a, b;
  a = "banana";
  b = 5;
  const resultado = calculadora.somar(a, b);
  expect(resultado).toBe("Erro");
});

test("subtrair", () => {
  var a, b;
  a = 5;
  b = 6;
  const resultado = calculadora.subtrair(a, b);
  expect(resultado).toBe(-1);
});
