import { getShopById, updateShop } from './../../services/ShopService';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Shop } from '../../interfaces/Shop';

@Component({
  selector: 'app-edit-shop',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.css']
})
export class EditShopComponent implements OnInit {

  shop!: Shop;

  formGroup = new FormGroup({
    shopName: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    foundedAt: new FormControl('', Validators.required)
  });

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getShop();
  }

  get shopName() {
    return this.formGroup.controls.shopName;
  }

  get description() {
    return this.formGroup.controls.description;
  }

  get foundedAt() {
    return this.formGroup.controls.foundedAt;
  }

  async getShop()
  {
    const shopId = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.shop= (await getShopById(shopId)).data.data;
  }

  async onSubmit() {
    if (this.formGroup.valid) {
      const shopId = parseInt(this.route.snapshot.paramMap.get("id")!);
      const shop: Shop = { name: this.shopName.value!, description: this.description.value!, foundedAt: this.foundedAt.value! }
      await updateShop(shop, shopId);
      this.router.navigate([`/shop/${shopId}`]);
    }
  }

}
