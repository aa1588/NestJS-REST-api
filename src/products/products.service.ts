import { 
    Injectable,
    ConflictException,
    NotFoundException
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma/prisma.service'
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateProductDto) {
        try {
            return await this.prisma.product.create({ data: { ...dto, price: dto.price } });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                throw new ConflictException('Product with these details already exists');
            }
            throw error;
        }
    }

    async findAll() {
        return await this.prisma.product.findMany();
    }

    async findOne(id: number) {
        const product =  await this.prisma.product.findUnique({ where: { id } });
        if(!product) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }
        return product;
    }


    async update(id: number, dto: UpdateProductDto) {
        try {
            return await this.prisma.product.update({
                where: { id },
                data: dto,
            });
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError &&err.code === 'P2025') {
                throw new NotFoundException(`Product with id ${id} not found`);
            }
            throw err;
        }
  }


    async remove(id: number) {
        try {
            return await this.prisma.product.delete({ where: { id } });
        } catch (err) {
            if (
                err instanceof PrismaClientKnownRequestError &&
                err.code === 'P2025'
            ) {
                // Record to delete not found
                throw new NotFoundException(`Product with id ${id} not found`);
            }
            throw err;
        }
  }

}
