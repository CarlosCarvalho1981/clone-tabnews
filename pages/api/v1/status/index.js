import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const versionResult = await database.query("SHOW server_version;");
  const maxConnResult = await database.query("SHOW max_connections");
  const databaseName = process.env.POSTGRES_DB;
  const usedConnResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: versionResult.rows[0].server_version,
        max_connections: parseInt(maxConnResult.rows[0].max_connections),
        used_connections: parseInt(usedConnResult.rows[0].count),
      },
    },
  });
}

export default status;
