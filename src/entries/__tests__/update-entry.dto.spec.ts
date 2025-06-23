import { UpdateEntryDto } from './update-entry.dto';

describe('UpdateEntryDto', () => {
  it('should be defined', () => {
    expect(UpdateEntryDto).toBeDefined();
  });

  it('should create a valid DTO with title and description', () => {
    const dto = new UpdateEntryDto();
    dto.title = 'Updated Entry';
    dto.description = 'Updated Description';

    expect(dto.title).toBe('Updated Entry');
    expect(dto.description).toBe('Updated Description');
  });

  it('should create a valid DTO with only title', () => {
    const dto = new UpdateEntryDto();
    dto.title = 'Updated Entry';

    expect(dto.title).toBe('Updated Entry');
    expect(dto.description).toBeUndefined();
  });

  it('should create a valid DTO with only description', () => {
    const dto = new UpdateEntryDto();
    dto.description = 'Updated Description';

    expect(dto.title).toBeUndefined();
    expect(dto.description).toBe('Updated Description');
  });

  it('should allow all fields to be optional', () => {
    const dto = new UpdateEntryDto();

    expect(dto.title).toBeUndefined();
    expect(dto.description).toBeUndefined();
  });

  it('should allow description to be optional', () => {
    const dto = new UpdateEntryDto();
    dto.title = 'Updated Entry';
    dto.description = undefined;

    expect(dto.title).toBe('Updated Entry');
    expect(dto.description).toBeUndefined();
  });
}); 