import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { User, Program } from '../../../models';
import { first } from 'rxjs/operators';
import { UserService } from '../../../services';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-qrcode',
    templateUrl: './qrcode.component.html',
    styleUrls: [],
})

export class QrcodeComponent {

    profile: User;
    public myAngularxQrCode: string = null;
    constructor(
        private userService: UserService
    ) {
        this.getProfile();
    }

    ngOnInit() {

        this.getProfile();

    }

    getProfile() {
        this.userService.getProfile().subscribe(user => {
            this.profile = user as User;
            this.myAngularxQrCode = this.profile.id.toString() + " " + formatDate(new Date(), 'yyyy/MM/dd', 'en');
        });
    }
}