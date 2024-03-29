import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ShopsComponent } from './pages/shops/shops.component';
import { ShopDetailComponent } from './pages/shop-detail/shop-detail.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent}, 
  {path: 'shops', component: ShopsComponent}, 
  {path: 'shop/:id', component: ShopDetailComponent}, 
  {path: 'products', component: ProductsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile-edit', component: EditProfileComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent}
];
