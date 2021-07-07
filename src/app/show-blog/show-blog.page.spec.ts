import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowBlogPage } from './show-blog.page';

describe('ShowBlogPage', () => {
  let component: ShowBlogPage;
  let fixture: ComponentFixture<ShowBlogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowBlogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowBlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
