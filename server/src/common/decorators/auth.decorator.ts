import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from "@nestjs/common";
import {
  AdminJwtGuard,
  JwtGuard,
  NotRequiredJwtGuard,
} from "../../auth/guards/jwt.guard";
import { User as IUser } from "@prisma/client";

export function Auth(isRequire = true) {
  if (isRequire === false)
    return applyDecorators(UseGuards(NotRequiredJwtGuard));
  return applyDecorators(UseGuards(JwtGuard));
}

export function IsAdmin() {
  return applyDecorators(UseGuards(AdminJwtGuard));
}

type TypeData = keyof IUser;
export const User = createParamDecorator(
  (data: TypeData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user) return undefined;

    return data ? user[data] : user;
  },
);
