import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { create } from 'domain';

it('can create an instance of auth service', async () => {
  const fakeUserService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
  };

  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        // if someone ask UsersService give them fakeUserService
        provide: UsersService,
        useValue: fakeUserService,
      },
    ],
  }).compile();
  const authService = module.get(AuthService);

  expect(authService).toBeDefined();
});
