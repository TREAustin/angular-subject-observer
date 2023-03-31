## Subject / Observer pattern for Angular Components.

### Setup ###

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

### Usage ####

The use of this is fairly straightforward.  I find that I use this in two ways.  The main method is for items like a navbar with links within other components and modal popups being used to update information the main component.  The first step to using this in both is to have the component needing to be updated and the one with the new data to both have the 

```
export class ComponentWaitingOnInformation{


}

export class ComponentSendingInformation{}

```
