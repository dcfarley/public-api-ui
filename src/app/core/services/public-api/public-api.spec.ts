import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { PublicApiService } from './public-api.service';
import { API } from 'src/app/core/models/API/api.model';

describe('PublicApiService', () => {
  let service: PublicApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(PublicApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get entries', () => {
    const testData: any = {
      entries: [{
        "API": "Axolotl", "Description": "Collection of axolotl pictures and facts",
        "Auth": "", "HTTPS": true, "Cors": "unknown",
        "Link": "https://theaxolotlapi.netlify.app/", "Category": "Animals"
      }]
    };

    service.getEntries().subscribe((data) => {
      expect(data).toEqual([new API("Axolotl", "Collection of axolotl pictures and facts",
        "", "true", "unknown", "https://theaxolotlapi.netlify.app/", "Animals")]);
    });

    const req = httpTestingController.expectOne('https://api.publicapis.org/entries');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  it('should get categories', () => {
    const testData: Array<string> = ["Animals", "Anime"];

    service.getCategories().subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne('https://api.publicapis.org/categories');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
