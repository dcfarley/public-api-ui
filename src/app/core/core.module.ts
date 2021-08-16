import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { ApiService } from './services/persistence/api/api.service';
import { PublicApiService } from './services/public-api/public-api.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule,
  ],
  providers: [
    ApiService,
    PublicApiService,
  ],
  exports: [
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import Core modules in the AppModule only.');
    }
  }
}
