import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

// const isDay = process.env.JWT_ACCESS_TOKEN_EXPIRE.slice(1, 2) === "d";
// const expireValue = Number(process.env.JWT_ACCESS_TOKEN_EXPIRE.slice(0, 1));

// const EXPIRE_TIME = (isDay ? expireValue * 24 : expireValue) * 3600 * 1000;

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // async login(dto: LoginDto) {
  //   const user: any = await this.validateUser(dto);
  //   return this.creatLoginInstance(user);
  // }

  // async register(dto: RegisterDto) {
  //   const user = await this.prisma.user.findUnique({
  //     where: { email: dto.email },
  //   });
  //   if (user) throw new BadRequestException("Email exists");
  //
  //   const salt = await genSalt(10);
  //   const newUser = await this.prisma.user.create({
  //     data: {
  //       name: dto.name,
  //       email: dto.email.toLowerCase(),
  //       password: await hash(dto.password, salt),
  //     },
  //   });
  //
  //   return { ...newUser, password: dto.password };
  // }

  // async creatLoginInstance(user: any) {
  //   let payload: any, userInstance: any;
  //   if (user.sub) {
  //     payload = {
  //       id: user.id,
  //       email: user.email,
  //       sub: user.sub,
  //     };
  //     userInstance = {
  //       id: user.id,
  //       email: user.email,
  //       name: user.sub.name,
  //       role: user.sub.role,
  //       sex: user.sub.sex,
  //       phone: user.sub.phone,
  //       delivery: user.sub.delivery,
  //     };
  //   } else {
  //     userInstance = user;
  //     payload = {
  //       id: user.id,
  //       email: user.email,
  //       sub: {
  //         name: user.name,
  //         role: user.role,
  //         sex: user.sex,
  //         phone: user.phone,
  //         delivery: user.delivery,
  //       },
  //     };
  //   }
  //
  //   return {
  //     user: userInstance,
  //     backendTokens: {
  //       accessToken: await this.jwtService.signAsync(payload, {
  //         expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
  //         secret: process.env.JWT_SECRET_KEY,
  //       }),
  //       refreshToken: await this.jwtService.signAsync(payload, {
  //         expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
  //         secret: process.env.JWT_REFRESH_TOKEN_KEY,
  //       }),
  //       expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
  //     },
  //   };
  // }

  // async validateUser(dto: LoginDto) {
  //   const user: any = await this.prisma.user.findUnique({
  //     where: { email: dto.email },
  //   });
  //
  //   if (user && (await compare(dto.password, user.password))) {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //
  //   throw new UnauthorizedException("Неверный email или пароль");
  // }

  // async refreshToken(user: any) {
  //   const payload = {
  //     id: user.id,
  //     email: user.email,
  //     sub: user.sub,
  //   };
  //
  //   return {
  //     accessToken: await this.jwtService.signAsync(payload, {
  //       expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE,
  //       secret: process.env.JWT_SECRET_KEY,
  //     }),
  //     refreshToken: await this.jwtService.signAsync(payload, {
  //       expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE,
  //       secret: process.env.JWT_REFRESH_TOKEN_KEY,
  //     }),
  //     expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
  //   };
  // }
}
