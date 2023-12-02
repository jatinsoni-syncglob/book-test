import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  async save(createBookDto: CreateBookDto): Promise<Book> {
    const book: Book = new Book();
    book.title = createBookDto.title;
    book.isbn = createBookDto.isbn;
    return this.bookRepository.save(book);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book: Book = new Book();
    book.title = updateBookDto.title;
    // book.id = id;
    await this.bookRepository.update(id, book);
    return this.bookRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<{ affected?: number }> {
    return this.bookRepository.delete(id);
  }
}
