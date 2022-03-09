import request from "supertest";

import { HttpServer } from "server/server";

beforeAll(async () => {
  await HttpServer.prepare();
});

async function login() {
  const response = await request(HttpServer.app)
    .post("/users/authenticate")
    .send({
      email: "arthur@dinamica.com",
      password: "admin123",
    });

  return response;
}

describe("Class", () => {
  it("Should block response", async () => {
    const response = await request(HttpServer.app).get("/classes");

    expect(response.status).toBe(401);
  });

  it("Should get all classes", async () => {
    const loginResponse = await login();

    const response = await request(HttpServer.app)
      .get("/classes")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(200);
  });
});
