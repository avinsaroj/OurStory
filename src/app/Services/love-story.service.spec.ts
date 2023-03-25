import { TestBed } from '@angular/core/testing';

import { LoveStoryService } from './love-story.service';

describe('LoveStoryService', () => {
  let service: LoveStoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoveStoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
