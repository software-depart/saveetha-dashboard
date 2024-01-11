import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {
  payments: any;
  isLoading: boolean | undefined;
  constructor(
    private paymentService: PaymentService,
  ) {
    this.isLoading = true
  }

  ngOnInit(): void {
    this.getAllPayments();
  }

  getAllPayments() {
    this.isLoading = true;
    this.paymentService.getAllPayments().subscribe(res => {
      this.isLoading = false;
      this.payments = res.data;
    })
  }
}

