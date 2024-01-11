import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
  orders: any;
  isLoading: boolean | undefined;
  category: string = '';
  constructor(
    private ordersService: OrdersService,
  ) {
    this.isLoading = true
  }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    // const queryString = 'location=Thandalam Campus'
    const queryString = this.createFilterQueryString();
    this.isLoading = true;
    this.ordersService.getAllOrders(queryString).subscribe(res => {
      this.isLoading = false;
      res.data.forEach((item: any) => {
        item.items = this.formatItemsText(item.cartIDs)
      });
      this.orders = res.data;
    })
  }

  search(): void {
    this.getAllOrders();
  }

  createFilterQueryString() {
    let queryString = '';
    if (this.category) {
      queryString += `${queryString.length > 0 ? '&' : ''} categoryId=${this.category}`
    }
    return queryString.trim();
  }
  formatItemsText(carts: any) {
    const items = carts.itemID.map((item: { name: any; }) => item.name)
    return items.join();
  }
}

