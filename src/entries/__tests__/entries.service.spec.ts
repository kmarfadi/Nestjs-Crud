 import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { EntriesService } from '../entries.service';
import { PrismaService } from '../../prisma.service';
import { CreateEntryDto } from '../dto/create-entry.dto';
import { UpdateEntryDto } from '../dto/update-entry.dto';

describe('EntriesService', () => {
  let service: EntriesService;

  const mockPrismaService = {
    entry: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockEntry = {
    id: 1,
    title: 'Test Entry',
    description: 'Test Description',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EntriesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<EntriesService>(EntriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new entry', async () => {
      const createEntryDto: CreateEntryDto = {
        title: 'Test Entry',
        description: 'Test Description',
      };

      mockPrismaService.entry.create.mockResolvedValue(mockEntry);

      const result = await service.create(createEntryDto);

      expect(mockPrismaService.entry.create).toHaveBeenCalledWith({
        data: createEntryDto,
      });
      expect(result).toEqual(mockEntry);
    });

    it('should create an entry without description', async () => {
      const createEntryDto: CreateEntryDto = {
        title: 'Test Entry',
      };

      const entryWithoutDescription = { ...mockEntry, description: null };
      mockPrismaService.entry.create.mockResolvedValue(entryWithoutDescription);

      const result = await service.create(createEntryDto);

      expect(mockPrismaService.entry.create).toHaveBeenCalledWith({
        data: createEntryDto,
      });
      expect(result).toEqual(entryWithoutDescription);
    });
  });

  describe('findAll', () => {
    it('should return all entries ordered by createdAt desc', async () => {
      const mockEntries = [mockEntry, { ...mockEntry, id: 2 }];
      mockPrismaService.entry.findMany.mockResolvedValue(mockEntries);

      const result = await service.findAll();

      expect(mockPrismaService.entry.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'desc',
        },
      });
      expect(result).toEqual(mockEntries);
    });

    it('should return empty array when no entries exist', async () => {
      mockPrismaService.entry.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return an entry by id', async () => {
      const id = 1;
      mockPrismaService.entry.findUnique.mockResolvedValue(mockEntry);

      const result = await service.findOne(id);

      expect(mockPrismaService.entry.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockEntry);
    });

    it('should throw NotFoundException when entry not found', async () => {
      const id = 999;
      mockPrismaService.entry.findUnique.mockResolvedValue(null);

      await expect(service.findOne(id)).rejects.toThrow(
        new NotFoundException(`Entry with ID ${id} not found`),
      );
    });
  });

  describe('update', () => {
    it('should update an existing entry', async () => {
      const id = 1;
      const updateEntryDto: UpdateEntryDto = {
        title: 'Updated Title',
        description: 'Updated Description',
      };

      const updatedEntry = { ...mockEntry, ...updateEntryDto };
      mockPrismaService.entry.findUnique.mockResolvedValue(mockEntry);
      mockPrismaService.entry.update.mockResolvedValue(updatedEntry);

      const result = await service.update(id, updateEntryDto);

      expect(mockPrismaService.entry.update).toHaveBeenCalledWith({
        where: { id },
        data: updateEntryDto,
      });
      expect(result).toEqual(updatedEntry);
    });

    it('should throw NotFoundException when updating non-existent entry', async () => {
      const id = 999;
      const updateEntryDto: UpdateEntryDto = { title: 'Updated Title' };

      mockPrismaService.entry.findUnique.mockResolvedValue(null);

      await expect(service.update(id, updateEntryDto)).rejects.toThrow(
        new NotFoundException(`Entry with ID ${id} not found`),
      );
    });

    it('should update only provided fields', async () => {
      const id = 1;
      const updateEntryDto: UpdateEntryDto = { title: 'Updated Title' };

      const updatedEntry = { ...mockEntry, title: 'Updated Title' };
      mockPrismaService.entry.findUnique.mockResolvedValue(mockEntry);
      mockPrismaService.entry.update.mockResolvedValue(updatedEntry);

      const result = await service.update(id, updateEntryDto);

      expect(mockPrismaService.entry.update).toHaveBeenCalledWith({
        where: { id },
        data: updateEntryDto,
      });
      expect(result).toEqual(updatedEntry);
    });
  });

  describe('remove', () => {
    it('should delete an existing entry', async () => {
      const id = 1;
      mockPrismaService.entry.findUnique.mockResolvedValue(mockEntry);
      mockPrismaService.entry.delete.mockResolvedValue(mockEntry);

      const result = await service.remove(id);

      expect(mockPrismaService.entry.delete).toHaveBeenCalledWith({
        where: { id },
      });
      expect(result).toEqual(mockEntry);
    });

    it('should throw NotFoundException when deleting non-existent entry', async () => {
      const id = 999;
      mockPrismaService.entry.findUnique.mockResolvedValue(null);

      await expect(service.remove(id)).rejects.toThrow(
        new NotFoundException(`Entry with ID ${id} not found`),
      );
    });
  });
});
