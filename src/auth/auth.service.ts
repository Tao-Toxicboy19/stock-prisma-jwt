import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import { AuthDto } from './dto';
import { Auth } from './type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async registerLocal(dto: AuthDto): Promise<Auth> {
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
}
