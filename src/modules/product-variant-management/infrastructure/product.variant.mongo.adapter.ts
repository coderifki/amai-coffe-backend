import { Injectable } from '@nestjs/common/decorators';
import { Prisma } from '@prisma/client';
import { Builder } from 'builder-pattern';

@Injectable()
export class ProductVariantMongoAdapter {
  constructor(private prismaService: any) {}

  async create(props: any): Promise<any> {
    try {
      const result = await this.prismaService.user.create({
        data: {
          email: props.email,
          password: props.password,
          phone: props.phone,
        },
      });

      const response = Builder<any>().build();

      return response;
    } catch (e) {
      console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          // throw new UserAlreadyExistsException();
        }
      }
      throw e;
    }
  }

  async checkExistence(props: any): Promise<any> {
    try {
      const { email, phone, excluded_id } = props;
      const clause: Prisma.UserWhereInput = {};

      const orClause: Prisma.UserWhereInput[] = [];
      if (email && email !== '') orClause.push({ email });
      if (phone && phone !== '') orClause.push({ phone });
      clause.OR = orClause;

      if (excluded_id) {
        clause.id = {
          notIn: [excluded_id],
        };
      }

      // console.log('clause', clause);
      const result = await this.prismaService.user.findFirst({
        where: clause,
      });

      if (result) return Builder<any>().build();

      return null;
    } catch (err) {
      throw err;
    }
  }

  async findById() {
    throw new Error('method not implemented');
  }
}
