import { TestBed, waitForAsync } from '@angular/core/testing';

import { CopyrightModule } from './copyright.module';

describe('CopyrightModule', () => {
  beforeEach(waitForAsync(() => {
    void TestBed.configureTestingModule({
      imports: [CopyrightModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CopyrightModule).toBeDefined();
  });
});
