import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "testuser",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "testuser",
      password: await bcrypt.hash("testpassword", 10),
      name: "testuser",
      token: "token",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "testuser",
    },
  });
};

export const removeAllTestContact = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: "testuser",
    },
  });
};

export const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: "testuser",
      firstName: "test",
      lastName: "test",
      email: "testemail@gmail.com",
      phone: "081234567890",
    },
  });
};

export const creatManyTestContact = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: `testuser`,
        firstName: `test ${i}`,
        lastName: `test ${i}`,
        email: `testemail${i}@gmail.com`,
        phone: `08123456789${i}`,
      },
    });
  }
};

export const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: "testuser",
    },
  });
};

export const removeAllTestAddresses = async () => {
  await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: "testuser",
      },
    },
  });
};
