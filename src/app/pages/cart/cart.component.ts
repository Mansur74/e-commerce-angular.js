import { getAllCarts } from './../../services/CartService';
import { Component, OnInit } from '@angular/core';
import { OrderCartComponent } from '../../components/order-cart/order-cart.component';
import { Cart } from '../../interfaces/Cart';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [OrderCartComponent, CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  carts! : Cart[];
  total: number = 0;

  constructor() { }

  ngOnInit() {
    this.getCarts();
  }

  getCarts = async () => {
    const result = await getAllCarts();
    this.carts = [...result.data.data];
    this.calculate();
  }

  calculate = () => {
    this.total = 0;
    this.carts.forEach((cart) =>{
      this.total += cart.quantity! * cart.product?.price!;
    });
  }
  

}
