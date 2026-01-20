import { Controller, Get, Post, Body, Patch, Param, Delete, UnauthorizedException, Request, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { registerDTo } from './dto/register.dto';
import { AuthGuard } from '@nestjs/passport';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("login")
  async login(@Body() loginDto:LoginDto, @Res({ passthrough: true }) res: Response){
    const user=await this.authService.validateUser(
      loginDto.username,
      loginDto.password
    );
    if(!user){
      throw new UnauthorizedException("아이디 또는 비밀번호가 틀렸습니다.");
    }
    const tokens = await this.authService.login(user);
    
    // HttpOnly 쿠키로 토큰 설정
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: isProduction, // HTTPS에서만 사용 (개발 환경에서는 false)
      sameSite: isProduction ? 'none' as const : 'lax' as const,
      maxAge: 15 * 60 * 1000, // 15분
      path: '/',
    };
    
    res.cookie('accessToken', tokens.accessToken, cookieOptions);
    
    res.cookie('refreshToken', tokens.refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    });
    
    return { message: '로그인 성공' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    // 쿠키 삭제
    res.clearCookie('accessToken', { path: '/' });
    res.clearCookie('refreshToken', { path: '/' });
    return { message: '로그아웃 성공' };
  }

  @Post("register")
  async register(@Body() RegisterDto:registerDTo){
    const user=await this.authService.register(
      RegisterDto.name,
      RegisterDto.password,
      RegisterDto.username
    )
  }
  @UseGuards(AuthGuard('jwt'))
  @Get("profile")
  getProfile(@Request() req){
    return req.user
  }
}
