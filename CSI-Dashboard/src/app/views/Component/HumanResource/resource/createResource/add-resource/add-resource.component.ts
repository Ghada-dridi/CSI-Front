import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {

  repeatForm: FormGroup;
  documents: string[] = ['CIN', 'CV', 'Lettre de motivation', 'Photo'];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.repeatForm = this.fb.group({
      repeatArray: this.fb.array([this.createRepeatForm()])
    });
  }

  createRepeatForm(): FormGroup {
    return this.fb.group({
      email: '',
      password: '',
      bio: '',
      phone: '',
      profession: ''
    });
  }

  get repeatFormGroup() {
    return this.repeatForm.get('repeatArray') as FormArray;
  }

  handleAddRepeatForm() {
    this.repeatFormGroup.push(this.createRepeatForm());
  }

  handleRemoveRepeatForm(index: number) {
    this.repeatFormGroup.removeAt(index);
  }

}