import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getUserList, getUserListIsDeleting, getUserListIsSaving } from './store/user.selectors';
import { loadUserList, removeUserListItem } from './store/user.actions';
import { UserListItem } from './store/user.state';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadUserList());
  }

  users$ = this.store.pipe(
    select(getUserList)
  )

  isSaving$ = this.store.pipe(
    select(getUserListIsSaving)
  )

  isDeleting$ = this.store.pipe(
    select(getUserListIsDeleting)
  )

  removeuser(item: UserListItem) {
    this.store.dispatch(removeUserListItem({ item }))
  }
}
