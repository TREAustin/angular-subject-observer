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

The use of this is fairly straightforward.  I find that I use this in two ways.  The main method is for items like a navbar with links within other components and modal popups being used to update information the main component.  The first step to using this in both is to have the component needing to be updated and the one with the new data to both have subscribed to the subject component.

The example below is for the component listening for changes outside of itself.  I have found using the ngDoCheck() method to work well for my use cases.  I have used this for both navbar and multiple modal components within the same component, while only using this one subject component.

```
import { Subscription } from 'rxjs';

export class ComponentWaitingOnInformation{
    //The data is set to a string here, but can be whatever you need.
    data: any = ""
    //Subscription instance being used to manage memory, unsubscribing in ngOnDestroy() prevents memory leaks.
    subscription: Subscription
  
    constructor(private subject: Subject){
        this.subscription = this.subject.observable.subscribe()
    }

    ngOnDestroy(){
        this.subscription.unsubscribe()
    }

    //When the subject is updated, ngDoCheck() will see if the data needs to be updated.
    ngDoCheck(){
        this.subject.observable.subscribe(x => {
            if(this.data !== this.subject.getData()){
                this.data = this.subject.getData()
            }
        });
    }
}
```

The component perfomring changes and notifying only needs to subscribe to the subject, implement ngOnDestroy() and notify of changes made.

```
import { Subscription } from 'rxjs';

export class ComponentSendingInformation{
    //The data is set to a string here, but can be whatever you need.
    data: any = ""
    //Subscription instance being used to manage memory, unsubscribing in ngOnDestroy() prevents memory leaks.
    subscription: Subscription
  
    constructor(private subject: Subject){
        this.subscription = this.subject.observable.subscribe()
    }

    ngOnDestroy(){
        this.subscription.unsubscribe()
    }

    //This method can be anything, a change in an object that binded, a button click, and more.
    onActionEvent(data: any){
        this.subject.setData(data);
    }
}

```

### Comments, Questions, or Suggestions? ###
Please feel free to reach out to me at tausti0065@gmail.com.