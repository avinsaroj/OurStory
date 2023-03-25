import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSinglePageComponent } from './blog-single-page.component';

describe('BlogSinglePageComponent', () => {
  let component: BlogSinglePageComponent;
  let fixture: ComponentFixture<BlogSinglePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogSinglePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
