import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LikedByPage } from './liked-by.page';

describe('LikedByPage', () => {
  let component: LikedByPage;
  let fixture: ComponentFixture<LikedByPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedByPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LikedByPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
