import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, tap, map } from 'rxjs';

import { User } from '../interface/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * * Observable: es el emisor, el que dice "oye tengo datos, hagan algo" a los
   * * observers (donde se realizó la subscripción). Es decir, es el que está
   * * emitiendo los datos.
   * 
   * * Los observables son declarativos, es decir, se define una función para publicar valores, 
   * * pero no se ejecuta hasta que un consumidor se suscribe a ella. El consumidor suscrito recibe 
   * * notificaciones hasta que se completa la función o hasta que se da de baja.
   * @returns 
   */

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUsers_withHeadersAndParams(): Observable<User[]> {
    //**************** Ejemplo de Headers *****************/
    //* Las instancias de los headers son INMUTABLES
    let myHeaders = new HttpHeaders({ 'myHeader': 'headervalue' });
    //* Así que si queremos enviar más encabezados debemos hacer lo siguiente
    myHeaders = myHeaders.set('id', '12345'); //*set, Si existe la cabecera (id), sobreescribe su valor, caso contrario crea la cabecera y su valor
    myHeaders = myHeaders.append('id', '0000');//*append, Si existe la cabecera (id), concatena su valor, caso contrario crea la cabecera y su valor

    //**************** Ejemplo de Params *****************/
    let myParams = new HttpParams()
      .set('page', 5)
      .set('size', 10)
      .set('sort', true);
    myParams = myParams.append('name', 'Martin');
    myParams = myParams.append('name', 'Gaspar');
    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers: myHeaders, params: myParams });
  }

  getUser(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/1`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  patchUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }

  uploadFiles(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`http://127.0.0.1:9000/file/upload`, formData,
      { observe: 'events', reportProgress: true });
  }

  getTextFile(): Observable<string> {
    return this.http.get(`assets/text.txt`, { responseType: 'text' });
  }

  downloadFile(): Observable<HttpResponse<Blob>> {
    return this.http.get(`assets/text.txt`, { responseType: 'blob', observe: 'response' });
  }

  //*********** RxJS Operators ***********/
  getUsersRxJS(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
      .pipe(
        tap(users => console.log(users)),
        map(users => users.map(user => ({
          ...user, 
          name: user.name.toUpperCase(), //* el ...user tiene el name, pero como le agregamos otro name, este último lo sobreescribirá
          isAdmin: user.id === 10
        })))
      );
  }
  

}
