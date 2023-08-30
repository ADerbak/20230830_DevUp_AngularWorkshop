import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserComponent, provideMockStore({})],
      imports: [RouterTestingModule]
    });

    component = TestBed.inject(UserComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
