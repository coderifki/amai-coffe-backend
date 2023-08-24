import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { ProductModule } from './modules/product-management/product.module';
import { CategoryProductModule } from './modules/category-product-management/category.product.module';

@Module({
  imports: [AuthModule, SharedModule, ProductModule, CategoryProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
