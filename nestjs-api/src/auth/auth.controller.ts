import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

interface RequestWithUser extends Request {
  user: { id: number; username: string };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Public() bypasses the global JwtAuthGuard.
  // @UseGuards(AuthGuard('local')) runs LocalStrategy to validate credentials.
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req: RequestWithUser): { accessToken: string; user: { id: number; username: string } } {
    return this.authService.generateToken(req.user);
  }

  @Post('logout')
  logout(): { message: string } {
    return this.authService.logout();
  }
}
