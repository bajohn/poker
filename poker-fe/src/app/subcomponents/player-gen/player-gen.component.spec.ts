import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerGenComponent } from './player-gen.component';

describe('PlayerGenComponent', () => {
  let component: PlayerGenComponent;
  let fixture: ComponentFixture<PlayerGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
