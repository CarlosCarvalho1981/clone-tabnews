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
      <DataBaseVersion />
      <MaxConnections />
      <ConnectedUsers />
    </>
  );
}

function FuncaoFetch(chave) {
  return useSWR(chave, fetchAPI, {
    refreshInterval: 2000,
  });
}

function UpdatedAt() {
  const { isLoading, data } = FuncaoFetch("/api/v1/status");

  let updatedAt = "Carregando...";

  if (!isLoading && data) {
    updatedAt = new Date(data.updated_at).toLocaleString("pt-BR");
  }
  return <div>Última atualização: {updatedAt}</div>;
}

function DataBaseVersion() {
  const { isLoading, data } = FuncaoFetch("/api/v1/status");

  let databaseVersion = "Carregando...";

  if (!isLoading && data) {
    databaseVersion = data.dependencies.database.version;
  }

  return <div>Versão do Banco de Dados: {databaseVersion}</div>;
}

function MaxConnections() {
  const { isLoading, data } = FuncaoFetch("/api/v1/status");

  let maxConnections = "Carregando...";

  if (!isLoading && data) {
    maxConnections = data.dependencies.database.max_connections;
  }

  return <div>Número máximo de conexões ao banco: {maxConnections}</div>;
}

function ConnectedUsers() {
  const { isLoading, data } = FuncaoFetch("/api/v1/status");
  let connectedUsers = "Carregando...";

  if (!isLoading && data) {
    connectedUsers = data.dependencies.database.used_connections;
  }

  return <div>Usuários Connectados: {connectedUsers}</div>;
}
