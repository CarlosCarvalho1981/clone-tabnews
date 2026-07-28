import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("Get to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  expect(responseBody.dependencies.database.version).toEqual("16.13");
  expect(responseBody.dependencies.database.max_connections).toBeGreaterThan(0);
  expect(
    responseBody.dependencies.database.used_connections,
  ).toBeGreaterThanOrEqual(1);
  expect(
    responseBody.dependencies.database.used_connections,
  ).toBeLessThanOrEqual(responseBody.dependencies.database.max_connections);
});
