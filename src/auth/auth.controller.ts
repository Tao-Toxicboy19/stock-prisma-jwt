import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './type';
import { AuthDto } from './dto';
import { Public } from 'src/common/decorators/pubilc.decorator';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Public()
    @Post('local/register')
    @HttpCode(HttpStatus.CREATED)
    registerLoacl(@Body() dto: AuthDto): Promise<User> {
        return this.authService.registerLocal(dto)
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('local/login')
    loginLocal(@Body() dto: AuthDto) {
        return this.authService.loginLocal(dto);
    }

    @Public()
    @Patch(':id/upload')
    @UseInterceptors(FileInterceptor('file'))
    updateProfile(@UploadedFile() file: Express.Multer.File, @Param('id') id: number): Promise<string> {
        return this.authService.updateProfile(file, +id);
    }
}
