import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoTelefonoComponent } from './contacto-telefono.component';

describe('ContactoTelefonoComponent', () => {
  let component: ContactoTelefonoComponent;
  let fixture: ComponentFixture<ContactoTelefonoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactoTelefonoComponent]
    });
    fixture = TestBed.createComponent(ContactoTelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
