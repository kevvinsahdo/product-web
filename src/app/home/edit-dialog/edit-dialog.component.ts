import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  product: any;
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.product = this.data;

    this.editForm = this.formBuilder.group({
      name: [this.product.name, [Validators.required]],
      value: [this.product.value, [Validators.required]],
      imageUrl: [this.product.imageUrl, [Validators.required]]
    });
  }

  get form() { return this.editForm.controls }

  public save(): void {
    if (this.editForm.invalid) {
      return
    }

    this.apiService.editProduct(this.product.id, this.editForm.value)
      .subscribe((data: any) => {
        this.product = data;
      });

    this.dialogRef.close(this.product);
  }

  public close(): void {
    this.dialogRef.close();
  }
}
