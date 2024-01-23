import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { UserService } from 'src/app/services/user/user.service'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {
  payments: any;
  isLoading: boolean | undefined;
  allPayments: any = []

  constructor(
    private paymentService: PaymentService,
    private userService: UserService
  ) {
    this.isLoading = true
  }

  ngOnInit(): void {
    this.userService.resetSearch.next('')
    this.userService.searchUpdated.subscribe(query => {
      if (this.allPayments.length > 0) {
        this.payments = this.userService.globalSearch(query.toLowerCase(), this.allPayments,
          ['userId.firstName', 'userId.type', 'amount', 'razorpayOrderId', 'status']);
      }
    })
    this.getAllPayments();
  }

  getAllPayments() {
    this.isLoading = true;
    this.paymentService.getAllPayments().subscribe(res => {
      this.isLoading = false;
      this.payments = res.data;
      this.allPayments = res.data;
    })
  }
}

