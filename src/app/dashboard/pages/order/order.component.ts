import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/order/order.service';
import { FoodcourtService } from 'src/app/services/foodcourt/foodcourt.service'
import { ResaturantService } from 'src/app/services/restaurant/resaturant.service'
import { UserService } from 'src/app/services/user/user.service'
import { CampusService } from 'src/app/services/campus/campus.service'

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})

export class OrderComponent implements OnInit {
  orders: any;
  isLoading: boolean | undefined;
  category: string = '';
  location = null;
  foodcourt: any;
  filteredFoodcourts: any = []
  foodcourts: any = [];
  restaurant: any;
  filteredRestaurants: any = [];
  restaurants: any = [];
  allOrders: any = [];
  campuses: any = [];
  constructor(
    private ordersService: OrdersService,
    private foodcourtService: FoodcourtService,
    private resaturantService: ResaturantService,
    private userService: UserService,
    private campusService: CampusService
  ) {
    this.isLoading = true
  }

  ngOnInit(): void {
    this.userService.resetSearch.next('')
    this.userService.searchUpdated.subscribe(query => {
      if (this.allOrders.length > 0) {
        this.orders = this.userService.globalSearch(query.toLowerCase(), this.allOrders,
          ['userID[0].userId', 'items', 'amount', 'cartIDs?.itemID[0]?.restaurantId[0]?.name',
            'cartIDs?.itemID[0]?.restaurantId[0]?.location', 'orderType', 'cartIDs.status']);
      }
    })
    this.getAllOrders();
    this.getAllFoodCourts();
    this.getAllRestaurants();
    this.getAllCampuses();
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
      this.allOrders = res.data;
    })
  }

  search(): void {
    this.getAllOrders();
  }

  createFilterQueryString() {
    let queryString = '';
    if (this.restaurant) {
      queryString += `${queryString.length > 0 ? '&' : ''} restaurantId=${this.restaurant}`
    }
    return queryString.trim();
  }
  formatItemsText(carts: any) {
    const items = carts.itemID.map((item: { name: any; }) => item.name)
    return items.join();
  }
  getAllFoodCourts() {
    this.foodcourtService.getAllFoodcourts('').subscribe(res => {
      this.foodcourts = res.data;
      this.filteredFoodcourts = res.data;
    })
  }
  getAllRestaurants() {
    this.resaturantService.getAllRestaurants('').subscribe(res => {
      this.restaurants = res.data;
      this.filteredRestaurants = res.data;
    })
  }
  onChangeLocation() {
    this.foodcourt = '';
    this.restaurant = ''
    if (this.location === '') {
      this.filteredFoodcourts = [...this.foodcourts];
    } else {
      this.filteredFoodcourts = this.foodcourts.filter((item: any) => item.location && item.location === this.location);
    }
  }
  onChangeFoodcourt() {
    this.restaurant = '';
    if (this.foodcourt === '') {
      this.filteredRestaurants = [...this.restaurants];
    } else {
      this.filteredRestaurants = this.restaurants.filter((item: any) => item.foodcourt && item.foodcourt._id === this.foodcourt);
    }
  }
  getAllCampuses() {
    this.campusService.getAllCampuses('').subscribe(res => {
      this.campuses = res.data;
    })
  }
}

