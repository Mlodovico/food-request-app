import { IsString, IsNotEmpty, IsArray, ValidateNested, IsOptional, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFoodRequestItemDto {
  @IsString()
  @IsNotEmpty()
  foodItemId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  specialInstructions?: string;
}

export class CreateFoodRequestDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFoodRequestItemDto)
  items: CreateFoodRequestItemDto[];

  @IsOptional()
  @IsString()
  notes?: string;
}
