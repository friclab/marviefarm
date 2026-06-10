"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const crypto = require("crypto");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwt, config) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
    }
    async validateUser(username, password) {
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (!user)
            return null;
        const bcryptOk = await bcrypt.compare(password, user.password);
        if (bcryptOk)
            return { id: user.id, username: user.username };
        const salt = this.config.get('CAKEPHP_SECURITY_SALT', '');
        const sha1Hash = crypto.createHash('sha1').update(salt + password).digest('hex');
        if (sha1Hash === user.password) {
            const newHash = await bcrypt.hash(password, 12);
            await this.prisma.user.update({ where: { id: user.id }, data: { password: newHash } });
            return { id: user.id, username: user.username };
        }
        return null;
    }
    generateToken(user) {
        return {
            accessToken: this.jwt.sign({ sub: user.id, username: user.username }),
            user: { id: user.id, username: user.username },
        };
    }
    logout() {
        return { message: 'Logged out. Discard the access token on the client.' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map