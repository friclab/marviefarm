import { AuthService } from './auth.service';
interface RequestWithUser extends Request {
    user: {
        id: number;
        username: string;
    };
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: RequestWithUser): {
        accessToken: string;
        user: {
            id: number;
            username: string;
        };
    };
    logout(): {
        message: string;
    };
}
export {};
