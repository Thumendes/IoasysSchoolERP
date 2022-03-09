import request from "supertest";
import { HttpServer } from "server/server";

beforeAll(async () => {
  await HttpServer.prepare();
});

describe("User", () => {
  it("Should login", async () => {
    const response = await request(HttpServer.app)
      .post("/users/authenticate")
      .send({
        email: "arthur@dinamica.com",
        password: "admin123",
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("Should not login with wrong password", async () => {
    const response = await request(HttpServer.app)
      .post("/users/authenticate")
      .send({
        email: "arthur@dinamica.com",
        password: "",
      });

    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe("Invalid password");
    expect(response.body.token).toBeUndefined();
  });

  it("Should not login with wrong email", async () => {
    const response = await request(HttpServer.app)
      .post("/users/authenticate")
      .send({
        email: "arthur@dinamica..com",
        password: "admin123",
      });

    expect(response.status).toBe(401);
    expect(response.body.error.message).toBe("User not found");
    expect(response.body.token).toBeUndefined();
  });
});
