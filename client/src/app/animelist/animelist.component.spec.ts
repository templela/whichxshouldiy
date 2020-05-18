import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimelistComponent } from './animelist.component';

describe('AnimelistComponent', () => {
  let component: AnimelistComponent;
  let fixture: ComponentFixture<AnimelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
