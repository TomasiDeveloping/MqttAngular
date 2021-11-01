import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {IMqttServiceOptions, MqttModule} from "ngx-mqtt";
import {FormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {DeviceComponent} from './device/device.component';
import {ChartsModule} from "ng2-charts";
import {ChartComponent} from './chart/chart.component';

const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.hostname,
  port: environment.port,
  protocol: 'ws',
  path: '/mqtt',
  // Only for MQTT brokers with authentication
  username: environment.username,
  password: environment.password
};

@NgModule({
  declarations: [
    AppComponent,
    DeviceComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
