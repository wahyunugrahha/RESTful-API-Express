import supertest from "supertest";
import { web } from "../src/application/web.js";
import { prismaClient } from "../src/application/database.js";

describe("POST /users", function () {
  afterEach(async () => {
    await prismaClient.user.deleteMany({
      where: {
        username: "testuser",
      },
    });
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
    expect(result.body.data.password).toBeUndefined(); // Password should not be returned
  });
});
