import { NotFoundException } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Builder } from 'builder-pattern';
import * as path from 'path';
import { ProductEntity } from 'src/modules/product-management/domain/product.entity';
import { MIME_TYPE } from '../../../../../core/enums/file-mimetype.enum';
import { generateFileName } from '../../../../../core/utils/generate.filename';
import {
  nestCheckFileExistance,
  nestCreateFile,
  nestDeleteFile,
} from '../../../../../core/utils/nest.file.utils';
import { validateFileExtension } from '../../../../../core/utils/validate.allowed.extension';
import { validateFileSize } from '../../../../../core/utils/validate.file.size';
import {
  PRODUCT_REPOSITORY,
  ProductRepository,
  UpdateProductProps,
} from '../../ports/product.repository';

export class ProductUpdateCommand {
  id: string;
  name?: string;
  price?: number;
  cat_product_id?: string;
  image?: Express.Multer.File;
}

export class ProductUpdateCommandResponse {
  data: ProductEntity;
}

@CommandHandler(ProductUpdateCommand)
export class ProductUpdateCommandHandler
  implements
    ICommandHandler<ProductUpdateCommand, ProductUpdateCommandResponse>
{
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepo: ProductRepository,
  ) {}
  async execute(command: ProductUpdateCommand) {
    let uploadedFiles: string = '';
    try {
      // console.dir(command, { depth: null });
      const { image, id, ...rest } = command;

      const oldProduct = await this.productRepo.findProductById({ id });
      if (!oldProduct) throw new NotFoundException('Product not found!');
      // console.log('old image', oldProduct.images);

      // if new image exist then upload (move file to certain path)
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
          path.join(process.cwd(), `public/uploads/products/${id}`), // path
          fileName, // file name
          image.buffer, // buffer
        );

        uploadedFiles = `products/${id}/${fileName}`; // mark that file is uploaded
        // console.log('new image', uploadedFiles);
      }

      const updatePayload = Builder<UpdateProductProps>(UpdateProductProps, {
        ...rest,
        id,
        image: uploadedFiles,
      }).build();

      const product = await this.productRepo.updateProduct(updatePayload);

      // when updating is successful, and theres new image, delete old image
      if (product && image) {
        // if old product has image
        if (oldProduct.images) {
          const basePath = path.join(process.cwd(), 'public/uploads');
          const filePath = path.join(basePath, oldProduct.images);

          // double check if file exist
          if (nestCheckFileExistance(filePath)) {
            // delete file
            nestDeleteFile(filePath);
          }
        }
      }

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
