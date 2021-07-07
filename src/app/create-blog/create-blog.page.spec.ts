import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateBlogPage } from './create-blog.page';

describe('CreateBlogPage', () => {
  let component: CreateBlogPage;
  let fixture: ComponentFixture<CreateBlogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBlogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
