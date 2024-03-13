import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterblockComponent } from './characterblock.component';

describe('CharacterblockComponent', () => {
  let component: CharacterblockComponent;
  let fixture: ComponentFixture<CharacterblockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterblockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
