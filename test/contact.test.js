import {
  createTestUser,
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

    logger.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeUndefined();
    expect(result.body.data.firstName).toBe("test");
    expect(result.body.data.lastName).toBe("test");
    expect(result.body.data.email).toBe("testemail@gmail.com");
    expect(result.body.data.phone).toBe("081234567890");
  });
});
