import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyBlogsPage } from './my-blogs.page';

describe('MyBlogsPage', () => {
  let component: MyBlogsPage;
  let fixture: ComponentFixture<MyBlogsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBlogsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyBlogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
