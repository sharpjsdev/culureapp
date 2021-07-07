import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditBlogPage } from './edit-blog.page';

describe('EditBlogPage', () => {
  let component: EditBlogPage;
  let fixture: ComponentFixture<EditBlogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBlogPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditBlogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
