import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { AuthDto } from './dto';
import { User, Token } from './type';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async registerLocal(dto: AuthDto): Promise<User> {
        try {
            const hash = await bcrypt.hash(dto.password, 12)
            const newUser = await this.prisma.users.create({
                data: {
                    username: dto.username,
                    password: hash
                }
            })
            return newUser
        } catch (error) {
            throw new UnauthorizedException()
        }
    }

    async loginLocal(dto: AuthDto): Promise<Token> {
        const user = await this.prisma.users.findUnique({
            where: {
                username: dto.username,
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, username: user.username, profile: user.profile };
        const tokens = { access_token: await this.jwtService.signAsync(payload) }

        return tokens
    }

    async updateProfile(file: Express.Multer.File, id: number): Promise<string> {
        try {
            const user = await this.prisma.users.findUnique({
                where: { id: id },
            });

            if (!user) {
                throw new NotFoundException('User not found');
            }
            console.log(file.filename)
            await this.prisma.users.update({
                where: { id: id },
                data: {
                    profile: file.filename,
                },
            });

            return 'Profile updated successfully';
        } catch (error) {
            throw new Error(`Failed to update profile: ${error.message}`);
        }
    }
}
