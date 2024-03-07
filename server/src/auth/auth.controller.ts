import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { RefreshJwtGuard } from "./guards/refresh.guard";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async registerUser(@Body() dto: RegisterDto) {
    const user = await this.authService.register(dto);

    return this.login({ password: user.password, email: user.email });
  }

  @Post("login")
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post("refresh")
  async refreshToken(@Request() req: any) {
    return await this.authService.refreshToken(req.user);
  }

  @UseGuards(RefreshJwtGuard)
  @Post("refresh/profile")
  async refreshTokenProfile(@Request() req: any) {
    return await this.authService.creatLoginInstance(req.user);
  }
}
