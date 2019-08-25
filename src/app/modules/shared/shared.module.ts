// nativescript

// angular
import { NgModule } from '@angular/core';

// app
import { PIPES } from './pipes';

// register nativescript custom components


@NgModule({
  imports: [
  ],
  declarations: [
    ...PIPES
  ],
  exports: [
    ...PIPES
  ]
})
export class SharedModule {}