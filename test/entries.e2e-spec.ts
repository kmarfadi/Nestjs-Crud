/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma.service';

describe('EntriesController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    // Clean up the database before each test
    await prismaService.entry.deleteMany();
  });

  afterAll(async () => {
    await prismaService.entry.deleteMany();
    await app.close();
  });

  describe('/entries (POST)', () => {
    it('should create a new entry', () => {
      const createEntryDto = {
        title: 'Test Entry',
        description: 'Test Description',
      };

      return request(app.getHttpServer())
        .post('/entries')
        .send(createEntryDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toBe(createEntryDto.title);
          expect(res.body.description).toBe(createEntryDto.description);
          expect(res.body).toHaveProperty('createdAt');
          expect(res.body).toHaveProperty('updatedAt');
        });
    });

    it('should create an entry without description', () => {
      const createEntryDto = {
        title: 'Test Entry',
      };

      return request(app.getHttpServer())
        .post('/entries')
        .send(createEntryDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.title).toBe(createEntryDto.title);
          expect(res.body.description).toBeNull();
        });
    });
  });

  describe('/entries (GET)', () => {
    it('should return empty array when no entries exist', () => {
      return request(app.getHttpServer())
        .get('/entries')
        .expect(200)
        .expect([]);
    });

    it('should return all entries', async () => {
      // Create test entries
      const entry1 = await prismaService.entry.create({
        data: { title: 'Entry 1', description: 'Description 1' },
      });
      const entry2 = await prismaService.entry.create({
        data: { title: 'Entry 2', description: 'Description 2' },
      });

      return request(app.getHttpServer())
        .get('/entries')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body).toHaveLength(2);
          expect(res.body[0].id).toBe(entry2.id); // Should be ordered by createdAt desc
          expect(res.body[1].id).toBe(entry1.id);
        });
    });
  });

  describe('/entries/:id (GET)', () => {
    it('should return a specific entry', async () => {
      const entry = await prismaService.entry.create({
        data: { title: 'Test Entry', description: 'Test Description' },
      });

      return request(app.getHttpServer())
        .get(`/entries/${entry.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(entry.id);
          expect(res.body.title).toBe(entry.title);
          expect(res.body.description).toBe(entry.description);
        });
    });

    it('should return 404 for non-existent entry', () => {
      return request(app.getHttpServer())
        .get('/entries/999')
        .expect(404);
    });

    it('should return 400 for invalid id format', () => {
      return request(app.getHttpServer())
        .get('/entries/invalid')
        .expect(400);
    });
  });

  describe('/entries/:id (PATCH)', () => {
    it('should update an existing entry', async () => {
      const entry = await prismaService.entry.create({
        data: { title: 'Original Title', description: 'Original Description' },
      });

      const updateDto = {
        title: 'Updated Title',
        description: 'Updated Description',
      };

      return request(app.getHttpServer())
        .patch(`/entries/${entry.id}`)
        .send(updateDto)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(entry.id);
          expect(res.body.title).toBe(updateDto.title);
          expect(res.body.description).toBe(updateDto.description);
        });
    });

    it('should update only provided fields', async () => {
      const entry = await prismaService.entry.create({
        data: { title: 'Original Title', description: 'Original Description' },
      });

      const updateDto = {
        title: 'Updated Title',
      };

      return request(app.getHttpServer())
        .patch(`/entries/${entry.id}`)
        .send(updateDto)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(entry.id);
          expect(res.body.title).toBe(updateDto.title);
          expect(res.body.description).toBe(entry.description); // Should remain unchanged
        });
    });

    it('should return 404 for non-existent entry', () => {
      const updateDto = { title: 'Updated Title' };

      return request(app.getHttpServer())
        .patch('/entries/999')
        .send(updateDto)
        .expect(404);
    });
  });

  describe('/entries/:id (DELETE)', () => {
    it('should delete an existing entry', async () => {
      const entry = await prismaService.entry.create({
        data: { title: 'Test Entry', description: 'Test Description' },
      });

      return request(app.getHttpServer())
        .delete(`/entries/${entry.id}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(entry.id);
        });
    });

    it('should return 404 for non-existent entry', () => {
      return request(app.getHttpServer())
        .delete('/entries/999')
        .expect(404);
    });
  });
}); 