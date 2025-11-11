import { Controller,Post, Body, Get, Param, Put, Delete} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService){}

    @Post()
    create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(Number(id));
    }


    @Put(':id')
    update(@Param('id') id: string, @Body() dto: any) {
        return this.productService.update(Number(id), dto);
    }


    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.remove(Number(id));
    }
}
