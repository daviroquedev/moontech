import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getStatus', () => {
    it('should return API status object', () => {
      expect(appController.getStatus()).toEqual({
        status: 'OK',
        message: 'API ok',
        version: '1.0.0',
      });
    });
  });
});