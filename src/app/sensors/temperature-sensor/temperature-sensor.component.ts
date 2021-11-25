import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DeviceModel} from "../../models/device.model";
import {Subscription} from "rxjs";
import {EventMqttService} from "../../services/event-mqtt.service";
import {IMqttMessage} from "ngx-mqtt";

@Component({
  selector: 'app-temperature-sensor',
  templateUrl: './temperature-sensor.component.html',
  styleUrls: ['./temperature-sensor.component.css']
})
export class TemperatureSensorComponent implements OnInit, OnDestroy {
  @Input() deviceName: string = '';
  @Input() topic: string = '';

  devices: DeviceModel[] = [];
  currentMessage: DeviceModel | undefined;
  subscription: Subscription | undefined;
  showHistory = false;
  chartValues: string[] = [];
  chartLabels: string[] = [];
  unitTemp = '°C';
  unitPressure = 'hPa';
  currentTemperature = '';
  currentPressure = '';

  constructor(private readonly mqttService: EventMqttService) { }

  ngOnInit(): void {
    this.subscribeToTopic();
  }

  onHistory(): void {
    this.showHistory = !this.showHistory;
  }

  onClearHistory() {
    this.devices = [];
    this.chartValues = [];
    this.chartLabels = [];
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private subscribeToTopic() {
    this.subscription = this.mqttService.topic(this.topic)
      .subscribe((data: IMqttMessage) => {
        let device: DeviceModel = new class implements DeviceModel {
          name = '';
          timeStamp = new Date();
          unit = '';
          value = ''
        }
        device.name = this.deviceName;
        if (data.topic.includes('Temperature')) {
          this.currentTemperature = data.payload.toString();
          device.unit = this.unitTemp;
        } else {
          this.currentPressure = data.payload.toString();
          device.unit = this.unitPressure;
        }
        device.value = data.payload.toString();
        this.currentMessage = device;
        this.devices.push(device);
        this.chartValues.push(device.value);
        this.chartLabels.push(device.timeStamp.toLocaleTimeString('de-DE'));
      });
  }

}
