import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportacaoPageComponent } from './importacao-page.component';

describe('ImportacaoPageComponent', () => {
  let component: ImportacaoPageComponent;
  let fixture: ComponentFixture<ImportacaoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportacaoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportacaoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
