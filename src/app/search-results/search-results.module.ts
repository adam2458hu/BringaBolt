import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SearchResultsComponent } from './search-results.component';

@NgModule({
  declarations: [
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    SearchResultsComponent
  ]
})
export class SearchResultsModule { }
