import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

interface ValidatedUser {
  id: number;
  username: string;
}

interface TokenResponse {
  accessToken: string;
  user: { id: number; username: string };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<ValidatedUser | null> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    if (!user) return null;

    // Primary path: bcrypt (all re-hashed users)
    const bcryptOk = await bcrypt.compare(password, user.password);
    if (bcryptOk) return { id: user.id, username: user.username };

    // Migration path: CakePHP 1.3 sha1(Security.salt + password)
    const salt = this.config.get<string>('CAKEPHP_SECURITY_SALT', '');
    const sha1Hash = crypto.createHash('sha1').update(salt + password).digest('hex');
    if (sha1Hash === user.password) {
      // Re-hash with bcrypt on first successful legacy login
      const newHash = await bcrypt.hash(password, 12);
      await this.prisma.user.update({ where: { id: user.id }, data: { password: newHash } });
      return { id: user.id, username: user.username };
    }

    return null;
  }

  generateToken(user: ValidatedUser): TokenResponse {
    return {
      accessToken: this.jwt.sign({ sub: user.id, username: user.username }),
      user: { id: user.id, username: user.username },
    };
  }

  // Stateless JWT: logout is client-side (discard the token).
  // This endpoint exists for symmetry with the legacy /users/logout route.
  logout(): { message: string } {
    return { message: 'Logged out. Discard the access token on the client.' };
  }
}
