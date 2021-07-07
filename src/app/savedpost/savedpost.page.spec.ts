import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavedpostPage } from './savedpost.page';

describe('SavedpostPage', () => {
  let component: SavedpostPage;
  let fixture: ComponentFixture<SavedpostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedpostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavedpostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
