import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { API } from 'src/app/core/models/API/api.model';
import { PublicApiService } from 'src/app/core/services/public-api/public-api.service';

import { PublicApisComponent } from './public-apis.component';

describe('PublicApisComponent', () => {
  let component: PublicApisComponent;
  let fixture: ComponentFixture<PublicApisComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let getEntriesSpy: jasmine.Spy<() => Observable<API[]>>;
  let getCategoriesSpy: jasmine.Spy<() => Observable<string[]>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicApisComponent],
      imports: [
        MatTableModule,
        MatSortModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        FlexLayoutModule,
        FormsModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    const publicApiService = jasmine.createSpyObj('PublicApiService', ['getEntries', 'getCategories']);

    getEntriesSpy = publicApiService.getEntries.and.returnValue(of([
      new API("Axolotl", "Collection of axolotl pictures and facts",
        "", "true", "unknown", "https://theaxolotlapi.netlify.app/", "Animals"),
      new API("MyAnimeList", "Anime and Manga Database and Community", "OAuth", "false", "true",
        "https://myanimelist.net/clubs.php?cid=13727", "Anime")]));

    getCategoriesSpy = publicApiService.getCategories.and.returnValue(of(["Animals", "Anime"]));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: PublicApiService, useValue: publicApiService }]
    });

    fixture = TestBed.createComponent(PublicApisComponent);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have expected public properties', () => {
    expect(component.categories).toBeDefined();
    expect(component.category).toBeDefined();
    expect(component.dataSource).toBeDefined();
    expect(component.displayedColumns).toBeDefined();
    expect(component.httpsOptions).toBeDefined();
    expect(component.httpsOption).toBeDefined();
    expect(component.authOptions).toBeDefined();
    expect(component.authOption).toBeDefined();
    expect(component.description).toBeDefined();
    expect(component.filtersHidden).toBeDefined();
  });

  it('should get entries', fakeAsync(() => {
    expect(getEntriesSpy).toHaveBeenCalled();
    expect(component.dataSource.data).toBeTruthy();
  }));

  it('should get categories', fakeAsync(() => {
    expect(getCategoriesSpy).toHaveBeenCalled();
    expect(component.categories).toBeTruthy();
  }));

  it('should set data source attributes', () => {
    component.setDataSourceAttributes();
    expect(component.dataSource.data).toBeTruthy();
  });

  it('should filter data set by category', () => {
    component.category = "Animals";
    component.filterDataSet();
    component.dataSource.data.forEach(element => {
      expect(element.category).toEqual(component.category);
    });
  });

  it('should filter data set by auth', () => {
    component.authOption = "OAuth";
    component.filterDataSet();
    component.dataSource.data.forEach(element => {
      expect(element.auth).toEqual(component.authOption);
    });
  });

  it('should filter data set by https', () => {
    component.httpsOption = "false";
    component.filterDataSet();
    component.dataSource.data.forEach(element => {
      expect(element.https).toEqual(component.httpsOption);
    });
  });

  it('should filter data set by description', () => {
    component.description = "axo";
    component.filterDataSet();
    component.dataSource.data.forEach(element => {
      expect(element.description).toContain(component.description);
    });
  });

  it('should reset filters', () => {
    component.category = 'x';
    component.authOption = 'y';
    component.httpsOption = 'z';
    component.description = '1';

    component.resetFilters();

    expect(component.category).toEqual('All');
    expect(component.authOption).toEqual('All');
    expect(component.httpsOption).toEqual('All');
    expect(component.description).toEqual('');
  });

  it('should toggle filter visibility', () => {
    component.filtersHidden = true;
    component.toggleFilters();
    expect(component.filtersHidden).toBeFalse();
    component.toggleFilters();
    expect(component.filtersHidden).toBeTrue();
  });
});
