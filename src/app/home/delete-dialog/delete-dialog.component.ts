import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  product: any;
  
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit() {
    this.product = this.data;
  }

  public delete() {
    this.apiService.deleteProduct(this.product.id)
      .subscribe((data: any) => {
        this.product = null;
      })
    
    this.dialogRef.close(this.product);
  }

  public close() {
    this.dialogRef.close();
  }
}
