import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { User } from './user';

const data: User[] = [
  {
    id: 1,
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
  },
  {
    id: 2,
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
  },
  {
    id: 3,
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
  },
];

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private serviceUrl = 'https://dummyjson.com/users';
  constructor(private http: HttpClient) {
    /*     let temp: StudentImport[] = [];
    for (let index = 0; index < 30; index++) {
      temp = [...temp, data];
    }
    this.students = temp; */
  }

  /* getUsers(): Observable<User[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<User[]>(map((data: any) => data.users));
  }
 */

  getUsers(): Observable<User[]> {
    return of(data);
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
