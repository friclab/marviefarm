import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
interface ValidatedUser {
    id: number;
    username: string;
}
interface TokenResponse {
    accessToken: string;
    user: {
        id: number;
        username: string;
    };
}
export declare class AuthService {
    private readonly prisma;
    private readonly jwt;
    private readonly config;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService);
    validateUser(username: string, password: string): Promise<ValidatedUser | null>;
    generateToken(user: ValidatedUser): TokenResponse;
    logout(): {
        message: string;
    };
}
export {};
