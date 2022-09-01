import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, tap, map, retry, catchError, of } from 'rxjs';

import { User } from '../interface/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = environment.apiUrl;
  private readonly defaultImage = 'https://robohash.org';

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
  getUsersRxJSCatchError(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users88`)
      .pipe(
        catchError((error: any) => {
          return of([]);
        })
      );
  }

  getUsersRxJSRetry(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users0000000`)//* haremos la url inválida para probar el retry
      .pipe(
        retry(3) //* Como la url es inválida, intentará 3 veces hacer peticiones y la 4ta vez ya mostrará error, que no se puede conectar
      );
  }

  getUsersRxJS(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
      .pipe(
        tap(users => console.log(users)),
        map(users => users.map(user => ({ //* Filtramos únicamente las propiedades que necesitamos, excluyendo: Address, Company e id
          name: user.name.toUpperCase(),
          username: user.username,
          email: user.email,
          phone: user.phone,
          website: user.website,
          isAdmin: user.id === 10,
          image: `${this.defaultImage}/${user.username}?set=set3`,
          searchKey: [user.name, user.username],
        }))),
        tap(users => console.log(users)),
      );
  }

  getUserRxJS(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/1`)
      .pipe(
        map(user => {
          return { ...user, isAdmin: true, searchKey: [user.name, user.username], }
        })
      );
  }


}
