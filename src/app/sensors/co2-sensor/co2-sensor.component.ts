import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DeviceModel} from "../../models/device.model";
import {Subscription} from "rxjs";
import {EventMqttService} from "../../services/event-mqtt.service";
import {IMqttMessage} from "ngx-mqtt";

@Component({
  selector: 'app-co2-sensor',
  templateUrl: './co2-sensor.component.html',
  styleUrls: ['./co2-sensor.component.css']
})
export class Co2SensorComponent implements OnInit, OnDestroy {

  @Input() deviceName: string = '';
  @Input() topic: string = '';

  devices: DeviceModel[] = [];
  currentMessage: DeviceModel | undefined;
  subscription: Subscription | undefined;
  showHistory = false;
  showDescription = true;
  chartValues: string[] = [];
  chartLabels: string[] = [];
  unit = 'PPM';
  coMessage = '';

  constructor(private readonly mqttService: EventMqttService) {
  }

  ngOnInit(): void {
    this.subscribeToCo2Sensor();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getColor(value: number) {
    if (value <= 600) {
      this.coMessage = 'Hervorragend';
      return '#08d12d';
    }
    if (value < 900) {
      this.coMessage = 'Gut';
      return '#1ee843'
    }
    if (value <= 1000) {
      this.coMessage = 'Befriedigend';
      return '#2bff52'
    }
    if (value < 1300) {
      this.coMessage = 'Mittel, Lüftung empfohlen';
      return '#eaff30'
    }
    if (value <= 1500) {
      this.coMessage = 'Mittel, Lüftung empfohlen';
      return '#ffe330'
    }
    if (value < 1800) {
      this.coMessage = 'Schlecht, Lüftung erforderlich';
      return '#ff6030'
    } else {
      this.coMessage = 'Schlecht, Lüftung erforderlich';
      return '#ff3030';
    }
  }

  onHistory() {
    this.showHistory = !this.showHistory;
  }

  onClearHistory() {
    this.devices = [];
    this.chartValues = [];
    this.chartLabels = [];
  }

  private subscribeToCo2Sensor() {
    this.subscription = this.mqttService.topic(this.topic)
      .subscribe((data: IMqttMessage) => {
        let device: DeviceModel = new class implements DeviceModel {
          name = '';
          timeStamp = new Date();
          unit = '';
          value = ''
        }
        device.name = this.deviceName;
        device.unit = this.unit;
        device.value = data.payload.toString();
        this.currentMessage = device;
        this.devices.push(device);
        this.chartValues.push(device.value);
        this.chartLabels.push(device.timeStamp.toLocaleTimeString('de-DE'));
      });
  }
}
