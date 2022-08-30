import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../interface/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

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

}
