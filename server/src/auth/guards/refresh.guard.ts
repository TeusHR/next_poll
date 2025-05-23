import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException("Доступ запрещен");

    try {
      request["user"] = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      });
    } catch (e) {
      throw new UnauthorizedException("Доступ запрещен");
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Refresh" ? token : undefined;
  }
}
