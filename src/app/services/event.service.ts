import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Event } from '../models';
import { User } from '../models';

@Injectable() //@Injectable({ providedIn: 'root' })
export class EventService {
    apiUrl = "http://localhost:8080/springrest/api"
    constructor(private http: HttpClient) { }

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

    addEvent(event: Event) {
        return this.http.post(this.apiUrl+'/events',event);
    }

    editEvent(event: Event,id: Number) {
        return this.http.put(`${this.apiUrl}/event/${id}`,event);
    }

    addAttendeeByUsername(id:Number,username:String) {
        return this.http.post(`${this.apiUrl}/event/${id}/attendee/username`,username);
    }

    enrollEvent(id:Number) {
        return this.http.post(`${this.apiUrl}/event/${id}/attendee`,"");
    }
}