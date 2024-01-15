import { Inject } from '@nestjs/common/decorators';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import * as path from 'path';
import { MIME_TYPE } from '../../../../../core/enums/file-mimetype.enum';
import { generateFileName } from '../../../../../core/utils/generate.filename';
import {
  nestCheckFileExistance,
  nestCreateFile,
  nestDeleteFile,
} from '../../../../../core/utils/nest.file.utils';
import { ProductEntity } from '../../../domain/product.entity';
import {
  CreateProductProps,
  PRODUCT_REPOSITORY,
  ProductRepository,
} from '../../ports/product.repository';
import { ObjectId } from 'bson';
import { existsSync, unlinkSync } from 'fs';
import { validateFileExtension } from '../../../../../core/utils/validate.allowed.extension';
import { validateFileSize } from '../../../../../core/utils/validate.file.size';

export class ProductCreateCommand {
  name: string;
  price: number;
  image?: Express.Multer.File;
}

export class ProductCreateCommandResponse {
  data: ProductEntity;
}

@CommandHandler(ProductCreateCommand)
export class ProductCreateCommandHandler
  implements ICommandHandler<ProductCreateCommand>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,
  ) {}

  async execute(command: ProductCreateCommand) {
    let uploadedFiles: string = '';
    try {
      // console.dir(command, { depth: null });
      const { image, ...rest } = command;

      const productId = new ObjectId().toString();

      // if image exist then upload (move file to certain path)
      if (image !== undefined) {
        // generate file name so it is unique
        const fileName = generateFileName(
          image.originalname,
          image.mimetype as MIME_TYPE, // cast as mime type
        );

        const maxSize = 1024 * 1024 * 3; // 3 mb by default
        validateFileExtension(
          image,
          [MIME_TYPE.JPEG, MIME_TYPE.JPG, MIME_TYPE.PNG],
          image.originalname,
        );
        validateFileSize(image.size, maxSize, image.originalname);

        // write file
        await nestCreateFile(
          path.join(process.cwd(), 'public/uploads'), // path
          `products/${productId + '-' + fileName}`, // file name
          image.buffer, // buffer
        );

        uploadedFiles = `products/${productId + '-' + fileName}`; // mark that file is uploaded
      }

      const createPayload = Builder<CreateProductProps>(CreateProductProps, {
        ...rest,
        id: productId,
        image: uploadedFiles,
      }).build();

      const product = await this.productRepo.createProduct(createPayload);

      return {
        data: product,
      };
    } catch (error) {
      console.trace(error);
      // if something went wrong on saving to the db but the file is uploaded, delete the file
      if (uploadedFiles !== '') {
        const basePath = path.join(process.cwd(), 'public/uploads');
        const filePath = path.join(basePath, uploadedFiles);

        // double check if file exist
        if (nestCheckFileExistance(filePath)) {
          // delete file
          nestDeleteFile(filePath);
        }
      }
      throw error;
    }
  }
}
