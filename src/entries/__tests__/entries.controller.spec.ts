/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { EntriesController } from '../entries.controller';
import { EntriesService } from '../entries.service';
import { CreateEntryDto } from '../dto/create-entry.dto';
import { UpdateEntryDto } from '../dto/update-entry.dto';

describe('EntriesController', () => {
  let controller: EntriesController;
  let service: EntriesService;

  const mockEntriesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
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
      controllers: [EntriesController],
      providers: [
        {
          provide: EntriesService,
          useValue: mockEntriesService,
        },
      ],
    }).compile();

    controller = module.get<EntriesController>(EntriesController);
    service = module.get<EntriesService>(EntriesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new entry', async () => {
      const createEntryDto: CreateEntryDto = {
        title: 'Test Entry',
        description: 'Test Description',
      };

      mockEntriesService.create.mockResolvedValue(mockEntry);

      const result = await controller.create(createEntryDto);

      expect(service.create).toHaveBeenCalledWith(createEntryDto);
      expect(result).toEqual(mockEntry);
    });

    it('should create an entry without description', async () => {
      const createEntryDto: CreateEntryDto = {
        title: 'Test Entry',
      };

      const entryWithoutDescription = { ...mockEntry, description: null };
      mockEntriesService.create.mockResolvedValue(entryWithoutDescription);

      const result = await controller.create(createEntryDto);

      expect(service.create).toHaveBeenCalledWith(createEntryDto);
      expect(result).toEqual(entryWithoutDescription);
    });
  });

  describe('findAll', () => {
    it('should return all entries', async () => {
      const mockEntries = [mockEntry, { ...mockEntry, id: 2 }];
      mockEntriesService.findAll.mockResolvedValue(mockEntries);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockEntries);
    });

    it('should return empty array when no entries exist', async () => {
      mockEntriesService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return an entry by id', async () => {
      const id = 1;
      mockEntriesService.findOne.mockResolvedValue(mockEntry);

      const result = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockEntry);
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
      mockEntriesService.update.mockResolvedValue(updatedEntry);

      const result = await controller.update(id, updateEntryDto);

      expect(service.update).toHaveBeenCalledWith(id, updateEntryDto);
      expect(result).toEqual(updatedEntry);
    });

    it('should handle partial updates', async () => {
      const id = 1;
      const updateEntryDto: UpdateEntryDto = { title: 'Updated Title' };

      const updatedEntry = { ...mockEntry, title: 'Updated Title' };
      mockEntriesService.update.mockResolvedValue(updatedEntry);

      const result = await controller.update(id, updateEntryDto);

      expect(service.update).toHaveBeenCalledWith(id, updateEntryDto);
      expect(result).toEqual(updatedEntry);
    });
  });

  describe('remove', () => {
    it('should delete an existing entry', async () => {
      const id = 1;
      mockEntriesService.remove.mockResolvedValue(mockEntry);

      const result = await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockEntry);
    });
  });
}); 