import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ImagePostPage } from './image-post.page';

describe('ImagePostPage', () => {
  let component: ImagePostPage;
  let fixture: ComponentFixture<ImagePostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagePostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ImagePostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
