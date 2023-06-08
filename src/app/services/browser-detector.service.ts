import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
  providedIn: 'root'
})
export class BrowserDetectorService {

  constructor(private deviceService: DeviceDetectorService) { }

  getBrowserName(): boolean {
    return this.deviceService.isMobile();
  }

}
