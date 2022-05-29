import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { StudentImport } from './user';

const data: StudentImport = {
  order: 1,
  startDate: 'fafafa',
  personId: 'afafa',
  titleTh: 'นาย',
  firstNameTh: 'อดิศร',
  lastNameTh: 'อัศวิน',
  titleEn: 'mr',
  firstNameEn: 'adisorn',
  lastNameEn: 'assawin',
  phone: '124547878',
  birthDate: 'fslgjs',
  address: 'afafafa',
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  students: StudentImport[] = [];
  private serviceUrl = 'https://dummyjson.com/users';
  constructor(private http: HttpClient) {
    let temp: StudentImport[] = [];
    for (let index = 0; index < 30; index++) {
      temp = [...temp, data];
    }
    this.students = temp;
  }

  /* getUsers(): Observable<User[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<User[]>(map((data: any) => data.users));
  }
 */

  getUsers(): Observable<StudentImport[]> {
    return of(this.students);
  }

  /* updateUser(user: StudentImport): Observable<StudentImport> {
    return this.http.patch<StudentImport>(
      `${this.serviceUrl}/${user.id}`,
      user
    );
  }

  addUser(user: StudentImport): Observable<StudentImport> {
    return this.http.post<StudentImport>(`${this.serviceUrl}/add`, user);
  }

  deleteUser(id: number): Observable<StudentImport> {
    return this.http.delete<StudentImport>(`${this.serviceUrl}/${id}`);
  }

  deleteUsers(users: StudentImport[]): Observable<StudentImport[]> {
    return forkJoin(
      users.map((user) =>
        this.http.delete<StudentImport>(`${this.serviceUrl}/${user.id}`)
      )
    );
  } */
}
