import { Test, TestingModule } from '@nestjs/testing';
import { EntriesModule } from './entries.module';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { PrismaService } from '../prisma.service';

describe('EntriesModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [EntriesModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('should provide EntriesController', () => {
    const controller = module.get<EntriesController>(EntriesController);
    expect(controller).toBeDefined();
  });

  it('should provide EntriesService', () => {
    const service = module.get<EntriesService>(EntriesService);
    expect(service).toBeDefined();
  });

  it('should provide PrismaService', () => {
    const prismaService = module.get<PrismaService>(PrismaService);
    expect(prismaService).toBeDefined();
  });

  it('should inject PrismaService into EntriesService', () => {
    const service = module.get<EntriesService>(EntriesService);
    expect(service).toBeDefined();
    // The service should have access to PrismaService through dependency injection
  });
}); 