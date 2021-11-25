import {Component, OnDestroy, OnInit} from '@angular/core';
import {IMqttMessage} from "ngx-mqtt";
import {Subscription} from "rxjs";
import {DeviceModel} from "../models/device.model";
import {EventMqttService} from "../services/event-mqtt.service";

@Component({
  selector: 'app-motion-detected',
  templateUrl: './motion-detected.component.html',
  styleUrls: ['./motion-detected.component.css']
})
export class MotionDetectedComponent implements OnInit, OnDestroy {
  subscription: Subscription | undefined;
  currentMessage: DeviceModel | undefined;
  timeOut: any;
  isLooked: boolean = false;

  constructor(private readonly mqttService: EventMqttService) {
  }

  ngOnInit(): void {
    this.subscribeToTopic();
  }

  setTimeOut(): void {
    this.isLooked = true;
    this.timeOut = setTimeout(() => {
      this.isLooked = false;
      if (this.currentMessage) {
        this.currentMessage.value = '0';
      }
    }, 10000)
  }

  cleatTimeOut() {
    if (this.timeOut) {
      this.isLooked = false;
      clearTimeout(this.timeOut);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private subscribeToTopic() {
    this.subscription = this.mqttService.topic('Radar/State')
      .subscribe((data: IMqttMessage) => {
        let device: DeviceModel = new class implements DeviceModel {
          name = '';
          timeStamp = new Date();
          unit = '';
          value = ''
        }
        device.name = 'Sensor';
        device.value = data.payload.toString();

        if (!this.isLooked) {
          this.currentMessage = device;
        }
        if (device.value === '1') {
          this.cleatTimeOut();
          this.setTimeOut();
        }
      });
  }

}
