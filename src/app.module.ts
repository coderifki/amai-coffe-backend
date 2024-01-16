import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryProductModule } from './modules/category-product-management/category.product.module';
import { ProductModule } from './modules/product-management/product.module';
import { TransactionManagementModule } from './modules/transaction-management/transaciton.management.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    AuthModule,
    SharedModule,
    ProductModule,
    CategoryProductModule,
    TransactionManagementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
