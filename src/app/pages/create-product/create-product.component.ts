import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/Product';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { createProduct, getProductById } from '../../services/ProductService';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  product!: Product;

  formGroup = new FormGroup({
    sku: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    imgURL: new FormControl('', Validators.required),
  });

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }

  onSubmit = async () => {
    const product: Product = {
      sku: this.sku.value!, 
      name: this.name.value!, 
      description: this.description.value!, 
      price: parseInt(this.price.value!), 
      color: this.color.value!, 
      stock: parseInt(this.stock.value!), 
      imgURL: this.imgURL.value!, 
      
    };
    const shopId = parseInt(this.route.snapshot.paramMap.get("id")!);
    await createProduct(product, shopId, 1);
  }


  get sku() {
    return this.formGroup.controls.sku;
  }
  get name() {
    return this.formGroup.controls.name;
  }
  get description() {
    return this.formGroup.controls.description;
  }
  get price() {
    return this.formGroup.controls.price;
  }
  get color() {
    return this.formGroup.controls.color;
  }
  get stock() {
    return this.formGroup.controls.stock;
  }
  get imgURL() {
    return this.formGroup.controls.imgURL;
  }

}
