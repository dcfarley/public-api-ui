import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Constants } from '../../constants/constants';
import { ApiAdapter } from '../../models/API/api.adapter';
import { API } from '../../models/API/api.model';
import { ApiService } from '../persistence/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PublicApiService {
  constructor(
    private apiService: ApiService,
    private adapter: ApiAdapter,
  ) { }

  getEntries(): Observable<API[]> {
    return this.apiService.get(Constants.urls.entries)
      .pipe(map((data: any) => data.entries.map((item: any) => this.adapter.adapt(item))));
  }

  getCategories(): Observable<string[]> {
    return this.apiService.get(Constants.urls.categories);
  }
}
