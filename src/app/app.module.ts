import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreeChartComponent } from './components/tree-chart/tree-chart.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { TreeviewModule } from 'ngx-treeview';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GaugeComponent } from './components/gauge/gauge.component';
import { SizeFormatPipe } from './size-format.pipe';
import { PieComponent } from './components/pie/pie.component';
import { MapComponent } from './components/map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeChartComponent,
    GaugeComponent,
    SizeFormatPipe,
    PieComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxUiLoaderModule,
    AppRoutingModule,
    TreeviewModule.forRoot(),
    NgxChartsModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
