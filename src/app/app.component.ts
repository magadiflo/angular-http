import { Component, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
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
    'id': 2,
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

  private userToUpdate: any = {
    'id': 2,
    'name': 'Gaspar Flores'
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.onGetUsers();
    //this.onDeleteUser();
    //this.onPatchUser();
    //this.onUpdateUser();
    //this.onGetUser();
    //this.onCreateUser();
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

  onPatchUser(): void {
    this.userService.patchUser(this.userToUpdate)
      .subscribe({
        next: user => console.log(user),
        error: err => console.log(err),
        complete: () => console.log('Done patching user')
      });
  }

  onDeleteUser(): void {
    this.userService.deleteUser(5)
      .subscribe({
        next: response => console.log(response),
        error: err => console.log(err),
        complete: () => console.log('Done deleting user')
      });
  }

  onUploadFile(files: File[]): void {
    const formData = new FormData(); //*FormData, representación programática de un formulario
    for (const file of files) {
      formData.append('files', file, file.name);//* 'files', nombre con que se recibirá en el backend
    }


    this.userService.uploadFiles(formData)
      .subscribe({
        next: event => {
          switch (event.type) {
            case HttpEventType.UploadProgress || HttpEventType.DownloadProgress:
              console.log(event);
              break;
            case HttpEventType.Response:
              console.log(event);
              break;

          }
        },
        error: err => console.log(err),
        complete: () => console.log('Done deleting user')
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
