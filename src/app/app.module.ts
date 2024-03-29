import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {IMqttServiceOptions, MqttModule} from "ngx-mqtt";
import {FormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import {ChartsModule} from "ng2-charts";
import {ChartComponent} from './chart/chart.component';
import {MotionDetectedComponent} from './motion-detected/motion-detected.component';
import {Co2SensorComponent} from './sensors/co2-sensor/co2-sensor.component';
import {FineDustSensorComponent} from './sensors/fine-dust-sensor/fine-dust-sensor.component';
import { TemperatureSensorComponent } from './sensors/temperature-sensor/temperature-sensor.component';


const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: environment.hostname,
  port: environment.port,
  // @ts-ignore
  protocol: environment.protocol,
  path: environment.path,
  // Only for MQTT brokers with authentication
  username: environment.username,
  password: environment.password,
};

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    MotionDetectedComponent,
    Co2SensorComponent,
    FineDustSensorComponent,
    TemperatureSensorComponent
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
