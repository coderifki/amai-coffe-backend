import { Controller } from '@nestjs/common/decorators/core/controller.decorator';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';

@Controller('employees')
export class EmployeeController {
  constructor() {}

  @Post('create')
  async create() {}
}
