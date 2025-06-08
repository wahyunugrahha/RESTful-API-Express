import supertest from "supertest";
import { web } from "../src/application/web.js";
import { createTestUser, removeTestUser } from "./test.util.js";
import { logger } from "../src/application/logging.js";
describe("POST /api/users", function () {
  afterEach(async () => {
    await removeTestUser();
  });

  it("should create a new user", async function () {
    const result = await supertest(web).post("/api/users").send({
      username: "testuser",
      password: "testpassword",
      name: "Test User",
    });
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("testuser");
    expect(result.body.data.name).toBe("Test User");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should reject if request is invalid", async function () {
    const result = await supertest(web).post("/api/users").send({
      username: "",
      password: "",
      name: "",
    });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject if username already registered", async function () {
    // 1. Buat user pertama kali (sukses)
    let result = await supertest(web).post("/api/users").send({
      username: "testuser",
      password: "testpassword",
      name: "Test User",
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("testuser");

    // 2. Coba buat user yang sama lagi (gagal)
    result = await supertest(web).post("/api/users").send({
      username: "testuser",
      password: "testpassword",
      name: "Test User",
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("POST /api/users/login", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should login with valid credentials", async function () {
    const result = await supertest(web).post("/api/users/login").send({
      username: "testuser",
      password: "testpassword",
    });

    logger.info(result.body);

    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("token");
  });

  it("should reject with invalid credentials", async function () {
    const result = await supertest(web).post("/api/users/login").send({
      username: "",
      password: "",
    });

    logger.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject with wrong password", async function () {
    const result = await supertest(web).post("/api/users/login").send({
      username: "testuser",
      password: "wrongpassword",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject with wrong usenmae", async function () {
    const result = await supertest(web).post("/api/users/login").send({
      username: "wronguser",
      password: "wrongpassword",
    });

    logger.info(result.body);

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/users/current", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeTestUser();
  });

  it("should can get current user", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "token");

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("testuser");
    expect(result.body.data.name).toBe("Test User");
  });

  it("should reject if token is invalid", async () => {
    const result = await supertest(web)
      .get("/api/users/current")
      .set("Authorization", "wrongtoken");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
