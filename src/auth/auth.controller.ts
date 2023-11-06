import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './type';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('local/register')
    @HttpCode(HttpStatus.CREATED)
    registerLoacl(@Body() dto: AuthDto): Promise<Auth> {
        return this.authService.registerLocal(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('local/login')
    loginLocal(@Body() dto: AuthDto) {
        return this.authService.loginLocal(dto);
    }
}
