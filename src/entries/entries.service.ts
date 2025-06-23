import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Injectable()
export class EntriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEntryDto: CreateEntryDto) {
    const result = await this.prisma.entry.create({
      data: createEntryDto,
    });
    return result;
  }

  async findAll() {
    const results = await this.prisma.entry.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return results;
  }

  async findOne(id: number) {
    const entry = await this.prisma.entry.findUnique({
      where: { id },
    });

    if (!entry) {
      throw new NotFoundException(`Entry with ID ${id} not found`);
    }

    return entry;
  }

  async update(id: number, updateEntryDto: UpdateEntryDto) {
    await this.findOne(id); // This will throw NotFoundException if entry doesn't exist

    const result = await this.prisma.entry.update({
      where: { id },
      data: updateEntryDto,
    });
    return result;
  }

  async remove(id: number) {
    await this.findOne(id); // This will throw NotFoundException if entry doesn't exist

    const result = await this.prisma.entry.delete({
      where: { id },
    });
    return result;
  }
}
