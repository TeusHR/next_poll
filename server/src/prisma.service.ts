import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { paginator, PaginatorTypes } from "@nodeteam/nestjs-prisma-pagination";

export const paginate: PaginatorTypes.PaginateFunction = paginator({
  perPage: 2,
});

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
