import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, './src/upload');
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const fileExt = file.originalname.split('.').pop();
          cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExt);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const fileExt = '.' + file.originalname.split('.').pop().toLowerCase();

        if (allowedExtensions.includes(fileExt)) {
          return cb(null, true);
        } else {
          return cb(new Error('Invalid file type'), false);
        }
      },
    };
  }
}
