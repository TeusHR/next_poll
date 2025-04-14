import {
  applyDecorators,
  UseGuards,
} from "@nestjs/common";
import {
  AdminJwtGuard,
  JwtGuard,
  NotRequiredJwtGuard,
} from "../../auth/guards/jwt.guard";

export function Auth(isRequire = true) {
  if (isRequire === false)
    return applyDecorators(UseGuards(NotRequiredJwtGuard));
  return applyDecorators(UseGuards(JwtGuard));
}

export function IsAdmin() {
  return applyDecorators(UseGuards(AdminJwtGuard));
}