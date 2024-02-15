import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/Product';

@Component({
  selector: 'app-order-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.css']
})
export class OrderCartComponent implements OnInit {
  @Input()
  product! : Product

  constructor() { }

  ngOnInit() {
    
  }

}
