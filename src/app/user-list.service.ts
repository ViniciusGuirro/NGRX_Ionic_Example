import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { UserListCreateBase, UserListItem } from "./store/user.state";

@Injectable()
export class UserListService {
  constructor() { }

  user: UserListItem[] = [];

  getUsers() {
    return of(this.user);
  }

  addUser(item: UserListCreateBase) {
    const newItem = {
      ...item,
      id: this.user.length + 1
    }
    this.user = [...this.user, newItem];
    return of(newItem);
  }

  removeUser(item: UserListItem) {
    this.user = this.user.filter(i => i.id !== item.id);
    return of(this.user);
  }
}