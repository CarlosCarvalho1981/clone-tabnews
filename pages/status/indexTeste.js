import { useState } from "react";

function CapsLock(propriedades) {
  const textoEmCaixaAlta = propriedades.texto.toUpperCase();
  const quantidadeDeCaracteres = ContaCaracteres(propriedades);
  if (propriedades.mostrar) {
    if (quantidadeDeCaracteres == 0) {
      return "Digite o texto";
    } else if (quantidadeDeCaracteres > 20) {
      return (
        <span style={{ color: "red", fontWeight: "bold" }}>
          QUANTIDADE DE CARACTERES EXCEDIDA
        </span>
      );
    } else {
      return textoEmCaixaAlta;
    }
  } else {
    return null;
  }
}

function ContaCaracteres(propriedades) {
  return propriedades.texto.length;
}

export default function StatusPage() {
  const [texto, setTexto] = useState("");
  const [mostrar, mostrarOcultar] = useState(true);

  return (
    <>
      <h1>Status</h1>

      <input
        type="text"
        value={texto}
        onChange={(evento) => setTexto(evento.target.value)}
        placeholder="Digite um texto..."
      />

      {/* <input type="button" value="Limpar texto" onClick={() => setTexto("")} /> */}
      <button onClick={() => setTexto("")}>Limpar texto</button>

      {/* <button onClick={() => mostrarOcultar(!mostrar)}>Mostrar/Ocultar</button> */}
      <button onClick={() => mostrarOcultar(!mostrar)}>
        {mostrar ? "Ocultar" : "Mostrar"}
      </button>

      <p>
        Texto em caixa alta: <CapsLock texto={texto} mostrar={mostrar} />
      </p>
      <p>
        Quantidade de caracteres: <ContaCaracteres texto={texto} />
      </p>
    </>
  );
}
