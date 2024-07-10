import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { addUserListItem } from '../store/user.actions';
import { UserListCreateBase } from '../store/user.state';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  @ViewChild(UserFormComponent) userFormComponent!: UserFormComponent;
  formValues!: UserListCreateBase;
  formValid?: boolean = false;

  constructor(private store: Store) { }

  ngOnInit() {}

  addUser() {
    if (this.formValid) {
      this.store.dispatch(addUserListItem({item: this.formValues}));
      this.userFormComponent.resetForm();
    }
  }

  onFormValuesChange(values: any) {
    this.formValues = values;
  }

  onFormStatusChange(isValid: boolean) {
    this.formValid = isValid;
  }
}
