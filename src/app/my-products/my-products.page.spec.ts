import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyProductsPage } from './my-products.page';

describe('MyProductsPage', () => {
  let component: MyProductsPage;
  let fixture: ComponentFixture<MyProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProductsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
