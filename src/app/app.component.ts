import { Component, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getUserList, getUserListIsDeleting, getUserListIsSaving, getUserListIsUpdating } from './store/user.selectors';
import { loadUserList, removeUserListItem, updateUserListItem } from './store/user.actions';
import { UserListCreateBase, UserListItem } from './store/user.state';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  @ViewChild(UserFormComponent) userFormComponent!: UserFormComponent;
  formValues!: UserListCreateBase;
  formValid?: boolean = false;
  isUpdatingUser: boolean = false;
  index: number = 0;

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

  isUpdating$ = this.store.pipe(
    select(getUserListIsUpdating)
  )

  onFormValuesChange(values: any) {
    this.formValues = values;
  }

  onFormStatusChange(isValid: boolean) {
    this.formValid = isValid;
  }

  removeuser(user: UserListItem) {
    this.store.dispatch(removeUserListItem({ item: user }))
  }

  updateuser(user: UserListItem) {
    this.isUpdatingUser = false;
    this.index = 0;

    const newUserData: UserListItem = {
      id: user.id,
      ...this.formValues
    }

    this.store.dispatch(updateUserListItem({ item: newUserData }))
  }

  openUpdateForm(user: UserListItem, index: number) {
    this.isUpdatingUser = true;
    this.index = index;

    setTimeout(() => {
      this.userFormComponent.setFormValues(user);
    }, 200);
  }
}
