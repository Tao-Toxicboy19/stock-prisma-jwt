import { IsNotEmpty, IsString, Matches, IsOptional } from 'class-validator';

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*[a-zA-Z]).{8,}$/, {
        message: 'Password must have @ * a A-Z',
    })
    password: string;

    @IsOptional()
    @IsString()
    profile: string | null;
}
