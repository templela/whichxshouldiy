import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimelistCustomComponent } from './animelistcustom.component';

describe('AnimelistCustomComponent', () => {
  let component: AnimelistCustomComponent;
  let fixture: ComponentFixture<AnimelistCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimelistCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimelistCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
