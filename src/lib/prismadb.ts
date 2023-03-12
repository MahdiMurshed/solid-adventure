/* eslint-disable no-undef */
import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-unused-vars
  var prisma: PrismaClient;
}

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

const prisma = new PrismaClient();
export default prisma;
