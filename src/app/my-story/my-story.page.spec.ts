import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyStoryPage } from './my-story.page';

describe('MyStoryPage', () => {
  let component: MyStoryPage;
  let fixture: ComponentFixture<MyStoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyStoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
