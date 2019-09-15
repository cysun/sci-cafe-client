import { Component, VERSION, OnInit, ViewChild } from '@angular/core';

import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService,UserService } from '../../../services';

import { Result } from '@zxing/library';
import { User } from '../../../models';

@Component({
  selector: 'app-scanner',
  templateUrl: 'scanner.component.html'
})
export class ScannerComponent implements OnInit {

  ngVersion = VERSION.full;

  user : User;
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasDevices: boolean;
  hasPermission: boolean;
  qrResultString: string;
  qrResult: Result;

  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo;

  eventId:number;

  constructor(
    private router: Router,
    private routerInfo:ActivatedRoute,
    private eventService: EventService,
    private userService:UserService,
  ) { 

  }

  camerasFoundHandler(event) {
    this.scanner.scan(event[0].deviceId);     
  };

  ngOnInit(): void {

    this.eventId =  this.routerInfo.snapshot.queryParams["eventId"];

    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;
      // this.currentDevice = devices[0];
    });

    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);
  }

  handleQrCodeResult(resultString: string) {
    console.debug('Result: ', resultString);
    let userId = Number(resultString.split(' ',1));
    this.eventService.addAttendeeById(this.eventId,userId).subscribe();
    this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
    });
    this.qrResultString = "Successfully add " + this.user.firstName + " " + this.user.lastName;

  }

  
}