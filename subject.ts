import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

export class SubjectServices{
    //Data being passed between subject and observer.
    private data: any = "";
    //Subject instance other components are added to and notified when needed.
    private subject = new Subject<any>();
    //Observable instance componenets are able to use to subscribe to the subject.
    observable$ = this.subject.asObservable();

    //Getter for the data being passed.  It is set to any so that it is re-useable throughout the application.
    getData() : any {
        return this.data;
    }

    //Setter and notifier for the subject.  
    setData(data: any) {
        this.data = data;
        this.subject.next(data);
    }
}