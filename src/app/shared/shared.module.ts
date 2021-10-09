import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PointReplacerPipe } from './pipes/point-replacer.pipe';
import { EnvPipe } from './pipes/env.pipe';
import { BuildProductUrlPipe } from './pipes/build-product-url.pipe';
import { GetProductImagesPipe } from './pipes/get-product-images.pipe';

import { LoadedDirective } from './directives/loaded.directive';

@NgModule({
	declarations: [
		PointReplacerPipe,
		EnvPipe,
		BuildProductUrlPipe,
		LoadedDirective,
		GetProductImagesPipe
	],
	imports: [
		CommonModule,
		RouterModule,
		FontAwesomeModule
	],
	exports: [
		CommonModule,
		FormsModule,
		RouterModule,
		FontAwesomeModule,
		LoadedDirective,
		PointReplacerPipe,
		EnvPipe,
		BuildProductUrlPipe,
		GetProductImagesPipe
	],
	providers: [PointReplacerPipe,EnvPipe,BuildProductUrlPipe,GetProductImagesPipe]
})
export class SharedModule {}