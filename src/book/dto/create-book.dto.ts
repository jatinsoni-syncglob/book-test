import { IsUnique } from '@youba/nestjs-dbvalidator';
import { IsNotEmpty, IsString, Validate } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsUnique, [{ table: 'book', column: 'isbn' }])
  isbn: string;
}
