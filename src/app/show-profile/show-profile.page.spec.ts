import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowProfilePage } from './show-profile.page';

describe('ShowProfilePage', () => {
  let component: ShowProfilePage;
  let fixture: ComponentFixture<ShowProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
