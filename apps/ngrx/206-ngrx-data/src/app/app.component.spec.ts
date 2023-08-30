import { createSpyObj } from 'jest-createspyobj';
import { of } from 'rxjs';

import { AppComponent } from './app.component';
import { ConfigService } from './config.service';

const title = 'Initial title';

describe('AppComponent', () => {
  let component: AppComponent;
  let configSvc: jest.Mocked<ConfigService>;

  beforeEach(() => {
    configSvc = createSpyObj(ConfigService);
    configSvc.title = of(title);

    component = new AppComponent(configSvc);
  });

  describe('title', () => {
    it('should be initialized', () => {
      component.ngOnInit();
      expect(component.title.value).toBe(title);
    });
  });
});
