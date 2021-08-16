import { TestBed } from '@angular/core/testing';
import { API } from './api.model';

describe('API', () => {
  let model: API;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: []
    }).compileComponents();
  });

  beforeEach(() => {
    model = new API("Axolotl", "Collection of axolotl pictures and facts",
      "testAuth", "true", "unknown", "https://theaxolotlapi.netlify.app/", "Animals");
  });

  it('should have expected properties', () => {
    expect(model.api).toBeTruthy();
    expect(model.description).toBeTruthy();
    expect(model.auth).toBeTruthy();
    expect(model.https).toBeTruthy();
    expect(model.cors).toBeTruthy();
    expect(model.link).toBeTruthy();
    expect(model.category).toBeTruthy();
  });

  it('should have expected values', () => {
    expect(model.api).toEqual("Axolotl");
    expect(model.description).toEqual("Collection of axolotl pictures and facts");
    expect(model.auth).toEqual("testAuth");
    expect(model.https).toEqual("true");
    expect(model.cors).toEqual("unknown");
    expect(model.link).toEqual("https://theaxolotlapi.netlify.app/");
    expect(model.category).toEqual("Animals");
  });
});
