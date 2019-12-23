import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable() //@Injectable({ providedIn: 'root' })
export class ImageService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    uploadImage(file:File) {
        const formdata: FormData = new FormData();
 
        formdata.append('image', file);

        let url = this.http.post(this.apiUrl+'/upload',formdata);

        console.log(url)

        return url;

        
    }
}