import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException("Access denied");

    try {
      request["user"] = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
    } catch (e) {
      throw new UnauthorizedException("Access denied");
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}

@Injectable()
export class NotRequiredJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) return true;

    try {
      request["user"] = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      return true;
    } catch (e) {
      return true;
    }
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}

@Injectable()
export class AdminJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException("Access denied");

    try {
      request["user"] = await this.checkRole(token);
    } catch (_) {
      throw new UnauthorizedException("Access denied");
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }

  private async checkRole(token: string) {
    const user = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
    if (user.sub.role !== "ADMIN")
      throw new UnauthorizedException("Access denied");
    return user;
  }
}
