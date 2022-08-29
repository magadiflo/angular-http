import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    //*Ejemplo del funcionamiento de un observable y subscribe
    //*this.exampleObservable();
  }

  private exampleObservable(): void {
    type HttpResponse = { code: number; data: string; };
    const observable = new Observable<HttpResponse>(subscriber => {
      console.log('Inside subscriber...');
      subscriber.next({ code: 200, data: 'this is data 1...' });
      subscriber.next({ code: 200, data: 'this is data 2...' });
      subscriber.next({ code: 200, data: 'this is data 3...' });
      //*subscriber.error({ code: 500, data: 'An error ocurred' });
      setTimeout(() => {
        subscriber.next({ code: 200, data: 'this is data more data...' });
        subscriber.complete();
      }, 3 * 1000);
      console.log('Subscriber is done emitting...');
    });

    observable.subscribe({
      next: (response: HttpResponse) => {
        console.log('got response: ', response);
      },
      error: err => {
        console.log('something wrong occurred: ', err);
      },
      complete: () => {
        console.log('done!');
      }
    });
  }

}
