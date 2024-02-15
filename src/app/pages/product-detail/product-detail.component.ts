import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { getProductById } from '../../services/ProductService';
import { Product } from '../../interfaces/Product';
import { CommonModule } from '@angular/common';
import { createCart } from '../../services/CartService';
import { Cart } from '../../interfaces/Cart';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = {}
  userId = 1;
  constructor(private route: ActivatedRoute) 
  {

  }

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get("id");
    this.getProduct(productId!);
  }

  getProduct = async (productId: string) => {
    const result = await getProductById(productId);
    this.product = result.data.data;
  }

  addToCart = async () => 
  {
    const cart : Cart = {quantity: 1}
    const productId = parseInt(this.route.snapshot.paramMap.get("id")!);
    const result = await createCart(cart, productId, this.userId);
  }




}
