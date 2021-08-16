import { TestBed } from '@angular/core/testing';
import { Constants } from './constants';

describe('Constants', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: []
    }).compileComponents();
  });

  beforeEach(() => {
  });

  it('should have expected properties', () => {
    expect(Constants.AppName).toBeTruthy();
    expect(Constants.errors).toBeTruthy();
    expect(Constants.errors.unexpected).toBeTruthy();
    expect(Constants.urls).toBeTruthy();
    expect(Constants.urls.categories).toBeTruthy();
    expect(Constants.urls.entries).toBeTruthy();
  });

  it('should have expected values', () => {
    expect(Constants.AppName).toEqual('Public API UI');
    expect(Constants.errors.unexpected).toEqual('An unexpected error has occurred.');
    expect(Constants.urls.categories).toEqual('categories');
    expect(Constants.urls.entries).toEqual('entries');
  });
});
