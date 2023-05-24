import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ProductModule } from './modules/product-management/product.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [AuthModule, SharedModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
