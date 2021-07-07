import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlockedUserPage } from './blocked-user.page';

describe('BlockedUserPage', () => {
  let component: BlockedUserPage;
  let fixture: ComponentFixture<BlockedUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlockedUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
