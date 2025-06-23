import { CreateEntryDto } from '../dto/create-entry.dto';

describe('CreateEntryDto', () => {
  it('should be defined', () => {
    expect(CreateEntryDto).toBeDefined();
  });

  it('should create a valid DTO with title and description', () => {
    const dto = new CreateEntryDto();
    dto.title = 'Test Entry';
    dto.description = 'Test Description';

    expect(dto.title).toBe('Test Entry');
    expect(dto.description).toBe('Test Description');
  });

  it('should create a valid DTO with only title', () => {
    const dto = new CreateEntryDto();
    dto.title = 'Test Entry';

    expect(dto.title).toBe('Test Entry');
    expect(dto.description).toBeUndefined();
  });

  it('should allow description to be optional', () => {
    const dto = new CreateEntryDto();
    dto.title = 'Test Entry';
    dto.description = undefined;

    expect(dto.title).toBe('Test Entry');
    expect(dto.description).toBeUndefined();
  });
}); 