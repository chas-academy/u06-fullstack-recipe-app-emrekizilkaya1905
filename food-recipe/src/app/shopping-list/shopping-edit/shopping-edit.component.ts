import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('measureInput') measureInputRef: ElementRef;
  constructor(private slService: ShoppingListService) {}

  ngOnInit() {}
  onAddItem() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const ingMeasure = this.measureInputRef.nativeElement.value; // Ölçüyü alma
    const newIngredient = new Ingredient(ingName, ingAmount, ingMeasure); // Ölçüyü ekle
    this.slService.addIngredient(newIngredient);
  }
}
