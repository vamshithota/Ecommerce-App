import { Component } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../types/cart.type';
import { Router } from '@angular/router';
import { CartStoreItem } from '../services/cart/cart.storeItem';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RatingsComponent } from '../../ratings/ratings.component';

@Component({
  selector: 'app-cart',
  imports: [FontAwesomeModule, CommonModule, RatingsComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {


  faTrash = faTrash;
  faBoxOpen = faBoxOpen;
  faShoppingCart = faShoppingCart;

  constructor(public cartStore: CartStoreItem, private router: Router){}

  navigateToHome(): void{
    this.router.navigate(['home/products']);
  }

  updateQuantity($event: any, cartItem: CartItem): void{
    if($event.target.innerText === '+'){
      this.cartStore.addProduct(cartItem.product);
    }else if($event.target.innerText === '-'){
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem){
    this.cartStore.removeProduct(cartItem);
  }

}
