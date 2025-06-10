import {
  createTestContact,
  createTestUser,
  getTestContact,
  removeAllTestContact,
  removeTestUser,
} from "./test.util";
import supertest from "supertest";
import { web } from "../src/application/web.js";
import { logger } from "../src/application/logging";

describe("POST /api/contacts", function () {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });

  it("should can create new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "token")
      .send({
        firstName: "test",
        lastName: "test",
        email: "testemail@gmail.com",
        phone: "081234567890",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.firstName).toBe("test");
    expect(result.body.data.lastName).toBe("test");
    expect(result.body.data.email).toBe("testemail@gmail.com");
    expect(result.body.data.phone).toBe("081234567890");
  });

  it("should reject if invalid token ", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "wrongtoken")
      .send();

    expect(result.status).toBe(401);
  });
});

describe("POST /api/contacts/:contactId", function () {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContact();
    await removeTestUser();
  });
  it("Should can create contact", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id)
      .set("Authorization", "token");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.firstName).toBe(testContact.firstName);
    expect(result.body.data.lastName).toBe(testContact.lastName);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it("Should return 404 if ontact id not found", async () => {
    const testContact = await getTestContact();

    const result = await supertest(web)
      .get("/api/contacts/" + testContact.id + 1)
      .set("Authorization", "token");

    logger.info("Respons dari server:", result.body);

    expect(result.status).toBe(404);
  });
});
