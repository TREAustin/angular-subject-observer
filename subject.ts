import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })

export class SubjectServices{
    private type: any = "";
    private subject = new Subject<any>();
    observable = this.subject.asObservable();

    getData() : any {
        return this.type;
    }

    setData(type: any) {
        this.type = type;
        this.subject.next(type);
    }
}