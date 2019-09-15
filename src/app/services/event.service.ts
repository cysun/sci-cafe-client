import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Event } from '../models';
import { User } from '../models';
import { environment } from '../../environments/environment';

@Injectable() //@Injectable({ providedIn: 'root' })
export class EventService {
    apiUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }

    getOwnEvents() {
        return this.http.get<Event[]>(this.apiUrl+'/ownevents');
    }

    getAllEvents() {
        return this.http.get<Event[]>(this.apiUrl+'/events');
    }

    getAllApprovedEvents() {
        return this.http.get<Event[]>(this.apiUrl+'/approvedEvents');
    }

    getAttendees(id:Number) {
        return this.http.get<User[]>(this.apiUrl+'/event/' + id + '/attendees');
    }

    dropAttendeeById(id:Number,userId:Number) {
        return this.http.delete(`${this.apiUrl}/event/${id}/attendee/${userId}`);
    }

    getEventById (id:Number) {
        return this.http.get<Event>(this.apiUrl+"/event/"+id);
    }

    rejectEventById (id:Number) {
        return this.http.put<Event>(this.apiUrl+"/event/reject/"+id,null);
    }

    approveEventById (id:Number) {
        return this.http.put<Event>(this.apiUrl+"/event/approve/"+id,null);
    }

    delete(id: Number) {
        location.reload();
        return this.http.delete(`${this.apiUrl}/event/${id}`);
    }

    addEvent(event: Event,file:File) {
        const formdata: FormData = new FormData();
 
        formdata.append('image', file);
        formdata.append('name',event.name);
        formdata.append('location',event.location);
        formdata.append('description',event.description);
        formdata.append('eventDate',event.eventDate.toString());
        formdata.append('startTime',event.startTime.toString());
        formdata.append('endTime',event.endTime.toString());
        if(event.status != null) {
            formdata.append('status',event.status.toString());
        } else {
            formdata.append('status','0');
        }

        return this.http.post(this.apiUrl+'/events',formdata);
    }

    addEventTag(id: number,tid:number) {
        return this.http.put(`${this.apiUrl}/addEventTag/${id}/${tid}`,[]);
    }

    editEvent(event: Event,file:File,id: Number) {
        const formdata: FormData = new FormData();

        console.log(event.eventDate.toString);
        formdata.append('image', file);
        formdata.append('name',event.name);
        formdata.append('location',event.location);
        formdata.append('description',event.description);
        formdata.append('eventDate',event.eventDate.toString());
        formdata.append('startTime',event.startTime.toString());
        formdata.append('endTime',event.endTime.toString());
        if(event.status != null) {
            formdata.append('status',event.status.toString());
        } else {
            formdata.append('status','0');
        }

        return this.http.put(`${this.apiUrl}/event/${id}`,formdata);
    }

    addAttendeeByUsername(id:Number,username:String) {
        return this.http.post(`${this.apiUrl}/event/${id}/attendee/username`,username);
    }

    getAttendedEvents() {
        return this.http.get<Event[]>(`${this.apiUrl}/user/events`);
    }

    addAttendeeById(id:Number,userId:Number) {
        return this.http.post(`${this.apiUrl}/event/${id}/addAttendee/${userId}`,"");
    }

    enrollEvent(id:Number) {
        return this.http.post(`${this.apiUrl}/event/${id}/attendee`,"");
    }

    deleteTag(id: number,tid:number) {
        return this.http.put(`${this.apiUrl}/deleteEventTag/${id}/${tid}`,[]);
    }
}