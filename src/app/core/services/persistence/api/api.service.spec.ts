import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from './api.service';
import { API } from 'src/app/core/models/API/api.model';

describe('ApiService', () => {
  let service: ApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make get requests', fakeAsync(() => {
    const testData: Array<any> = [new API("Axolotl", "Collection of axolotl pictures and facts",
      "", "true", "unknown", "https://theaxolotlapi.netlify.app/", "Animals")];

    service.get('entries').subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne('https://api.publicapis.org/entries');
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
  }));

  it('should format bad request errors', fakeAsync(() => {
    const emsg = 'Deliberate 400 error.';

    service.get('entries').subscribe(
      data => fail('should have failed with the 400 error'),
      (errors: Array<string>) => {
        expect(errors).toContain("Deliberate 400 error.");
      }
    );

    const req = httpTestingController.expectOne('https://api.publicapis.org/entries');

    // Respond with mock error
    req.flush(emsg, { status: 400, statusText: 'Bad Request' });
  }));

  it('should format unexpected error messages', fakeAsync(() => {
    const emsg = 'An unexpected error has occurred.';

    service.get('entries').subscribe(
      data => fail('should have failed with the network error'),
      (errors: Array<string>) => {
        expect(errors).toContain(emsg);
      }
    );

    const req = httpTestingController.expectOne('https://api.publicapis.org/entries');

    // Create mock ErrorEvent, raised when something goes wrong at the network level.
    // Connection timeout, DNS error, offline, etc
    const mockError = new ErrorEvent('Network error', {
      message: emsg,
    });

    // Respond with mock error
    req.error(mockError);
  }));

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
