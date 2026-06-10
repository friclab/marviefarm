import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
interface JwtPayload {
    sub: number;
    username: string;
}
export interface AuthenticatedUser {
    userId: number;
    username: string;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(config: ConfigService);
    validate(payload: JwtPayload): AuthenticatedUser;
}
export {};
