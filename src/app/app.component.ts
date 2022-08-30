import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from './interface/user';

import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private user: User = {
    'id': 5,
    'name': 'Martín Díaz',
    'username': 'martin',
    'email': 'martin_DF@april.biz',
    'address': {
      'street': 'Perú Kulas Light',
      'suite': 'Apt. 556',
      'city': 'Gwenborough',
      'zipcode': '92998-3874',
      'geo': {
        'lat': '-99.9999',
        'lng': '81.1496'
      }
    },
    'phone': '5-555-736-8031 x56442',
    'website': 'martin.hildegard.org',
    'company': {
      'name': 'Google',
      'catchPhrase': 'Multi-layered client-server neural-net',
      'bs': 'harness real-time e-markets'
    }
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.onUpdateUser();
    this.onGetUsers();
    //this.onGetUser();
    //this.onCreateUser();
  }

  onGetUsers(): void {
    this.userService.getUsers()
      .subscribe({
        next: users => console.table(users),
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

  onCreateUser(): void {
    this.userService.createUser(this.user)
      .subscribe({
        next: user => console.log(user),
        error: err => console.log(err),
        complete: () => console.log('Done creating user')
      });
  }

  onUpdateUser(): void {
    this.userService.updateUser(this.user)
      .subscribe({
        next: user => console.log(user),
        error: err => console.log(err),
        complete: () => console.log('Done updating user')
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
