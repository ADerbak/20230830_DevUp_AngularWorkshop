import { TestBed } from '@angular/core/testing';
import { createSpyObj } from 'jest-createspyobj';

import { HelloService } from './hello.service';
import { UserService } from './user.service';

describe('HelloUserService', () => {
  let helloUserService: HelloService;
  let userService: jest.Mocked<UserService>;

  beforeEach(() => {
    userService = createSpyObj(UserService);

    // mock dependencies
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });

    // Always retrieve services from TestBed
    helloUserService = TestBed.inject(HelloService);
  });

  it('should calculate a greeting', () => {
    // program mock
    const user = {
      id: '1',
      firstName: 'Rachel',
      lastName: 'Hardin'
    };
    userService.currentUser.mockReturnValue(user);

    // execute test method and assert result
    expect(helloUserService.calculateHello('Hello')).toBe(
      'Hello, Rachel Hardin!'
    );

    // verify mocks
    expect(userService.currentUser).toHaveBeenCalledTimes(1);
  });
});
