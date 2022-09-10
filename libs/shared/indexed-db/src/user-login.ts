import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class userInfoService extends Dexie {
  constructor() {
    super('DexieDB'); //database name 'DexieDB'

    this.version(1).stores({
      httpCache: '++,url,data',
      userLogin: '',
    });

    this.open() //opening the database
      .then((data) => console.log('DB Opened data  ', data))
      .catch((error) => {
        console.log('error = '), error;
      });
  }
}
