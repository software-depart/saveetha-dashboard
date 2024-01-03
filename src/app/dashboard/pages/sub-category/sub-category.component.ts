import { Component } from '@angular/core';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent {
names=""
  
  ngOnInit(): void {
    
  }
  
  onSubmit(event: any) {}

  delete(name:any){
    this.names=name
      }
}


