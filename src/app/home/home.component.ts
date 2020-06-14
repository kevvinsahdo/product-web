import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Product } from '../models/product.model';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[];
  breakpoint: Number;

  constructor(
    private apiService: ApiService,
    private editDialog: MatDialog,
    private deleteDialog: MatDialog,
    private addDialog: MatDialog) { }

  ngOnInit() {
    this.getAllProducts();
    this.breakpoint = this.calcBreakpoint();
  }

  onResize(event: Event) {
    this.breakpoint = this.calcBreakpoint(event);
  }

  calcBreakpoint(event = null) {
    let cols = 4;
    let width = window.innerWidth;
    if (event != null) {
      width = event.target.innerWidth;
    }

    if (width <= 800) {
      cols = 1;
    }
    
    if (width >= 1600) {
      cols = 6;
    }

    return cols;
  }

  private getAllProducts(): void {
    this.apiService.getAllProducts()
      .subscribe((response: any[]) => {
        this.products = response;
      })
  }

  openEditDialog(product): void {
    const editDialogRef = this.editDialog.open(EditDialogComponent, {
      data: product
    });

    editDialogRef.afterClosed().subscribe((data: any) => {
      this.getAllProducts();
    });
  }

  openDeleteDialog(product): void {
    const deleteDialogRef = this.deleteDialog.open(DeleteDialogComponent, {
      data: product
    });

    deleteDialogRef.afterClosed().subscribe((data: any) => {
      this.getAllProducts();
    });
  }

  openAddDialog(): void {
    const addDialogRef = this.addDialog.open(AddDialogComponent, {})

    addDialogRef.afterClosed().subscribe((data: any) => {
      this.getAllProducts();
    });
  }
}
