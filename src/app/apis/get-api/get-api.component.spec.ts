import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetApiService } from './get-api.component';

describe('GetApiService', () => {
  let component: GetApiService;
  let fixture: ComponentFixture<GetApiService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetApiService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetApiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
