import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.onGetUsers();
    this.onGetUser();
  }

  onGetUsers(): void {
    this.userService.getUsers()
      .subscribe({
        next: users => console.log(users),
        error: err => console.log(err),
        complete: () => console.log('Done getting users')
      });
  }

  onGetUser(): void {
    this.userService.getUser()
      .subscribe({
        next: user => console.log(user),
        error: err => console.log(err),
        complete: () => console.log('Done getting user')
      });
  }

  //*Ejemplo del funcionamiento de un observable y subscribe
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
