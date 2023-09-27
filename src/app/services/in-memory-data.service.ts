import { Injectable } from '@angular/core';
import { usersData } from '../core/mockData/users';
import { User } from '../core/models/user';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    const users: User[]= usersData;
    return {users};
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
  }
}
