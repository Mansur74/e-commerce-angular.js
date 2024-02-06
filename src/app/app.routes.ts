import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './pages/home/products/products.component';

export const routes: Routes = [{path: 'home', component: HomeComponent}, {path: 'product', component: ProductsComponent}];
