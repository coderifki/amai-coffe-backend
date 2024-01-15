import {
  Controller,
  Get,
  NotFoundException,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('files')
  streamFiles(
    @Query('path') path: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    try {
      // if query path not exist
      if (!path) throw new NotFoundException(`${path} not found`);

      // replace path, add prefix (app path)
      const formatedPath = join(process.cwd(), 'public/uploads', `${path}`);

      // console.log(formatedPath);
      // check if path exist
      if (!existsSync(formatedPath)) {
        throw new NotFoundException(`${path} not found`);
      }

      const file = createReadStream(formatedPath);

      res.set({ 'Content-Type': 'image/jpeg' }); // set response to image
      return new StreamableFile(file);
    } catch (error) {
      throw error;
    }
  }
}
