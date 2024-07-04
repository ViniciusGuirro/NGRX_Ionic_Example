import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getUserList, getUserListIsDeleting, getUserListIsSaving, getUserListIsUpdating } from './store/user.selectors';
import { loadUserList, removeUserListItem, updateUserListItem } from './store/user.actions';
import { UserListItem } from './store/user.state';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isUpdatingUser: boolean = false;

  form: UntypedFormGroup = this.fb.group({
    name: ['', Validators.required],
    profession: ['', Validators.required],
    age: ['', Validators.required],
    genre: ['', Validators.required]
  })

  constructor(private store: Store, private fb: UntypedFormBuilder,) { }

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

  isUpdating$ = this.store.pipe(
    select(getUserListIsUpdating)
  )

  removeuser(user: UserListItem) {
    this.store.dispatch(removeUserListItem({ item: user }))
  }

  updateuser(user: UserListItem) {
    this.isUpdatingUser = false;

    const newUserData: UserListItem = {
      id: user.id,
      ...this.form.value
    }

    this.store.dispatch(updateUserListItem({ item: newUserData }))
  }

  openUpdateForm(user: UserListItem) {
    this.isUpdatingUser = true;

    this.form.setValue(user);
  }
}
