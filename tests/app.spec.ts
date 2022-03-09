import request from "supertest";
import { HttpServer } from "server/server";

beforeAll(async () => {
  await HttpServer.prepare();
});

describe("App", () => {
  it("GET / (Welcome)", async () => {
    const response = await request(HttpServer.app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      version: "1.0.0",
      name: "Ioasys School ERP API",
      description: "ERP API for Ioasys School",
    });
  });
});
