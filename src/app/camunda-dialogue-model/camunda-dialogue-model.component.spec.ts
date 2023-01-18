import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamundaDialogueModelComponent } from './camunda-dialogue-model.component';

describe('CamundaDialogueModelComponent', () => {
  let component: CamundaDialogueModelComponent;
  let fixture: ComponentFixture<CamundaDialogueModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CamundaDialogueModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CamundaDialogueModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
