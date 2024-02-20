import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { getProductById } from '../../services/ProductService';
import { Product } from '../../interfaces/Product';
import { CommonModule } from '@angular/common';
import { createCart } from '../../services/CartService';
import { Cart } from '../../interfaces/Cart';
import { getAccessToken, getRefreshToken, getUser } from '../../services/AuthService';
import { ReviewCartComponent } from '../../components/review-cart/review-cart.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ReviewCartComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product | null = null;
  isLoading: boolean = true;
  constructor(private route: ActivatedRoute, private router: Router) 
  {

  }

  ngOnInit() {
    if (localStorage.getItem("refreshToken") == null && sessionStorage.getItem("refreshToken") == null)
      this.router.navigate(["/sign-in"]);
    else {
      const productId = this.route.snapshot.paramMap.get("id");
      this.getProduct(productId!);
    }

  }

  getProduct = async (productId: string) => {
    const refreshToken: string = getRefreshToken();
    const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
    try {
      const result = await getProductById(productId, accessToken);
    this.product = result.data.data;
    } catch (error) {
      this.product = null;
      console.log("dsfasf", this.product)
    }
    this.isLoading = false;
  }

  addToCart = async () => 
  {
    const refreshToken: string = getRefreshToken();
    const accessToken = (await getAccessToken(refreshToken)).data.data.accessToken;
    const cart : Cart = {quantity: 1}
    const productId = parseInt(this.route.snapshot.paramMap.get("id")!);
    const user = await getUser(accessToken);
    const result = await createCart(cart, user.data.data.id!, productId);
  }




}
