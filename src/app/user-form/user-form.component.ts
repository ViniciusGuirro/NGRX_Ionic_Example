import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { UserListItem } from '../store/user.state';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Output() formValuesChange = new EventEmitter<any>();
  @Output() formStatusChange = new EventEmitter<boolean>();

  form: UntypedFormGroup = this.fb.group({
    name: ['', Validators.required],
    profession: ['', Validators.required],
    age: ['', Validators.required],
    genre: ['', Validators.required]
  })

  constructor(private fb: UntypedFormBuilder) { }

  ngOnInit() {
    this.form.valueChanges.subscribe(values => {
      this.formValuesChange.emit(values);
    });

    this.form.statusChanges.subscribe(status => {
      this.formStatusChange.emit(this.form.valid);
    });
  }

  resetForm() {
    this.form.reset();
  }

  setFormValues(values: UserListItem) {
    this.form.setValue(values);
  }
}
