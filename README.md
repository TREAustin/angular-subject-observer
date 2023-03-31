## Subject / Observer pattern for Angular Components.

###Usage###

This is straightforward to set up in a project.  You will need to inject this class into the constructor and add the Subscription import to your project.e
You will want to use the subscription to hold the observable and unsubscribe to it in ngOnDestroy, prevents memory leaks.

``` 
import { Subscription } from 'rxjs';

export class AnyComponent {
  subscription: Subscription;
  
  constructor(private subject: Subject){
    this.subscription = this.subject.observable.subscribe();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
}
```
