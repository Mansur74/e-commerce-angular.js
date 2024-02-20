import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/Product';
import { Cart } from '../../interfaces/Cart';
import { updateCart } from '../../services/CartService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css']
})
export class OrderCartComponent implements OnInit {
  @Input()
  cart! : Cart
  @Input()
  calculate!: () => void

  constructor() { }

  ngOnInit() {
    
  }

  increaseQuantity = async () =>{
    if(this.cart.quantity! <= this.cart.product?.stock!)
    {
      this.cart.quantity!++;
      await updateCart(this.cart, this.cart.id!);
      this.calculate();
    }
  }

  decreaseQuantity = async () =>{
    if(this.cart.quantity! > 0)
    {
      this.cart.quantity!--;
      await updateCart(this.cart, this.cart.id!);
      this.calculate();
    }
  }

}
