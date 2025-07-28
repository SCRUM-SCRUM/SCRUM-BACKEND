import { ApiKeyGuard } from './api-key.guard';
import { ConfigService } from '@nestjs/config';

describe('ApiKeyGuard', () => {
  it('should be defined', () => {
    const mockConfigService = {
      get: jest.fn().mockReturnValue('expected-api-key'), 
    } as unknown as ConfigService;

    const guard = new ApiKeyGuard(mockConfigService);
    expect(guard).toBeDefined();
  });
});
