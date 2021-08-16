import { Injectable } from '@angular/core';
import { Adapter } from '../../interfaces/adapter.interface';
import { API } from './api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiAdapter implements Adapter<API> {
  constructor() { }

  adapt(item: any): API {
    const obj = new API(
      item.API,
      item.Description,
      item.Auth,
      item.HTTPS.toString(),
      item.Cors,
      item.Link,
      item.Category,
    );

    return obj;
  }
}
