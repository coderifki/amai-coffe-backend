import { Module } from '@nestjs/common';
import { EmployeeController } from './infrastructure/employee.controller';

@Module({
  controllers: [EmployeeController],
})
export class EmployeeModule {}
