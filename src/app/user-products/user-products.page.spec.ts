import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserProductsPage } from './user-products.page';

describe('UserProductsPage', () => {
  let component: UserProductsPage;
  let fixture: ComponentFixture<UserProductsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
