import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DataBaseStatus />
    </>
  );
}

function DataBaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let databaseStatus = "Carregando...";

  if (!isLoading && data) {
    databaseStatus = (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Número máximo de conexões ao banco:{" "}
          {data.dependencies.database.max_connections}
        </div>
        <div>
          Usuários Connectados: {data.dependencies.database.used_connections}
        </div>
      </>
    );
  }
  return (
    <>
      <h2>Banco de Dados</h2>
      <div>{databaseStatus}</div>
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAt = "Carregando...";

  if (!isLoading && data) {
    updatedAt = new Date(data.updated_at).toLocaleString("pt-BR");
  }
  return <h2>Última atualização: {updatedAt}</h2>;
}
