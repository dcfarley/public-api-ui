import { TestBed } from '@angular/core/testing';
import { ApiAdapter } from './api.adapter';
import { API } from './api.model';

describe('ApiAdapter', () => {
  let adapter: ApiAdapter;
  let model: API;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: []
    }).compileComponents();
  });

  beforeEach(() => {
    adapter = new ApiAdapter();
  });

  it('should adapt generic object into API model', () => {
    model = adapter.adapt({
      "API": "Axolotl", "Description": "Collection of axolotl pictures and facts",
      "Auth": "testAuth", "HTTPS": true, "Cors": "unknown",
      "Link": "https://theaxolotlapi.netlify.app/", "Category": "Animals"
    });

    expect(model.api).toEqual("Axolotl");
    expect(model.description).toEqual("Collection of axolotl pictures and facts");
    expect(model.auth).toEqual("testAuth");
    expect(model.https).toEqual("true");
    expect(model.cors).toEqual("unknown");
    expect(model.link).toEqual("https://theaxolotlapi.netlify.app/");
    expect(model.category).toEqual("Animals");
  });
});
