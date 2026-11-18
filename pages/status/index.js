import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);

  if (!response.ok) {
    throw new Error("Falha ao consultar a API");
  }

  return response.json();
}

export default function StatusPage() {
  const { isLoading, data, error } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  if (error) {
    return <h1>Erro ao carregar o status!</h1>;
  }

  if (isLoading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <>
      <h1>Status</h1>
      <UpdatedAt updatedAt={data.updated_at} />
      <DataBaseStatus database={data.dependencies.database} />
    </>
  );
}

function UpdatedAt({ updatedAt }) {
  return (
    <h2>Última atualização: {new Date(updatedAt).toLocaleString("pt-BR")}</h2>
  );
}

function DataBaseStatus({ database }) {
  return (
    <>
      <h2>Banco de Dados</h2>
      <div>Versão: {database.version}</div>
      <div>Número máximo de conexões ao banco: {database.max_connections}</div>
      <div>Usuários conectados: {database.used_connections}</div>
    </>
  );
}
