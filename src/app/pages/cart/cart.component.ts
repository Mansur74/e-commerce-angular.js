import { getAllCarts } from './../../services/CartService';
import { Component, OnInit } from '@angular/core';
import { OrderCartComponent } from '../../components/order-cart/order-cart.component';
import { Cart } from '../../interfaces/Cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [OrderCartComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts! : Cart[]

  constructor() { }

  ngOnInit() {
    this.getCarts();
  }

  getCarts = async () => {
    const result = await getAllCarts();
    this.carts = [...result.data.data];
  }

  

}
