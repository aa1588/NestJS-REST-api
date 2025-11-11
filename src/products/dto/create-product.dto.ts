export class CreateProductDto {
    name: string;
    description?: string;
    price: string; // send as string to avoid float precision issues
}