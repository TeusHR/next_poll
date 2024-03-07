import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";

export const IsIdNumber = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const id = request.params.id;

    if (isNaN(Number(id))) {
      throw new BadRequestException("Object id must be integer");
    }

    return id;
  },
);
