import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent {
  @Input() 
  product! : Product;
  

}
