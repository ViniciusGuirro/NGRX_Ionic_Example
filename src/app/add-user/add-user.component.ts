import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addUserListItem } from '../store/user.actions';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent  implements OnInit {
  form: UntypedFormGroup = this.fb.group({
    name: ['', Validators.required],
    profession: ['', Validators.required],
    age: ['', Validators.required],
    genre: ['', Validators.required]
  })

  constructor(private fb: UntypedFormBuilder, private store: Store) { }

  ngOnInit() {}

  addUser() {
    if (this.form.valid) {
      this.store.dispatch(addUserListItem({item: this.form.value}));
      this.form.reset();
    }
  }

}
