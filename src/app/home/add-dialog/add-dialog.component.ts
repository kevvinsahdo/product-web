import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {
  product: any;
  addForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      value: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]]
    });
  }

  get form() { return this.addForm.controls }

  public save(): void {
    if (this.addForm.invalid) {
      return
    }

    this.apiService.createProduct(this.addForm.value)
      .subscribe((data: any) => {
        this.product = data;
      });

    this.dialogRef.close(this.product);
  }

  public close(): void {
    this.dialogRef.close();
  }
}
