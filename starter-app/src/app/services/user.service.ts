import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersService {
  private url = '/users';
  constructor(private http: Http) { }
  results: string[];

  getUsers(vendorid) {
    return this.http.get(this.url + '/' ).pipe(
      map(res => res.json()));
  }

  getUsersDeleted(vendorid) {
    return this.http.get(this.url + '/deleted/' + vendorid).pipe(
      map(res => res.json()));
  }

  getUser(ibmid) {
    return this.http.get(this.url + '/ibmid/' + ibmid).pipe(
      map(res => res.json()));
  }

  addUser(user) {
    return this.http.post(this.url, user).pipe(
      map(res => res.json()));
  }

  updateUser(user) {
    return this.http.post(this.getUserUrl(user._id), user).pipe(
      map(res => res.json()));
  }

  deleteUser(id) {
    return this.http.delete(this.getUserUrl(id)).pipe(
      map(res => res.json()));
  }

  private getUserUrl(id) {
    return this.url + '/id/' + id;
  }

  getUsersByRole(role, vendorid) {
    return this.http.get(this.url + '/vendor/' + vendorid + '/role/' + role).pipe(
      map(res => res.json()));
  }

}
