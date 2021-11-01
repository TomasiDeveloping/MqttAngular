import {Injectable} from '@angular/core';
import {IMqttMessage, MqttService} from "ngx-mqtt";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class EventMqttService {

  private readonly endpoint: string;

  constructor(private _mqttService: MqttService,) {
    this.endpoint = environment.mqttEndpoint;
  }

  topic(deviceId: string): Observable<IMqttMessage> {
    let topicName = `${this.endpoint}/${deviceId}`;
    return this._mqttService.observe(topicName);
  }
}
