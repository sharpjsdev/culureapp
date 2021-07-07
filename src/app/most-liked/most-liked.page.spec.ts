import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MostLikedPage } from './most-liked.page';

describe('MostLikedPage', () => {
  let component: MostLikedPage;
  let fixture: ComponentFixture<MostLikedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostLikedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MostLikedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
