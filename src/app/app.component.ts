import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shop';
  productsType: any = [];
  products: any = [];
  customerBuy: any = [];
  customerBuyId: any = [];

  valSortName: boolean = false;
  valSortPrice: boolean = false;

  constructor(private http: HttpClient) {


  }


  onChooseElem(item) {
    item.checked = !item.checked;
    if (item.checked) {
      this.customerBuyId.push(item.id);
    } else {
      let index = this.customerBuyId.indexOf(item.id);
      if (index > -1) {
        this.customerBuyId.splice(index, 1);
      }
    }
  }

  onBuyThing() {
    this.customerBuyId.forEach(element => {
      this.customerBuy.push(this.products.find(currentValue => currentValue.id === element));
      this.products.forEach(elementt => {
        if (elementt.id === element) {
          elementt.sold = true;
        }
      });
    });
    this.customerBuyId = [];
  }

  onChooseAllCategoty() {
    this.products.forEach(element => {
      element.hide = false;
    });
  }

  onChooseCategoty(cat) {
    this.products.forEach(element => {
      if (element.type === cat) {
        element.hide = false;
      } else {
        element.hide = true;
      }
    });
  }

  onSortName() {
    this.products.sort((a, b) => {
      let nameA = a.name.toLowerCase();
      let nameB = b.name.toLowerCase();
      if (nameA < nameB){return -1;}
      if (nameA > nameB){return 1;}
      return 0;
    });
    this.valSortName = !this.valSortName;
    if (!this.valSortName) {
      this.products.reverse();
    }
  }

  onSortPrice(){
    this.products.sort((a, b) => {
      let priceA = a.price;
      let priceB = b.price;
      return priceB-priceA
    });
    this.valSortPrice = !this.valSortPrice;
    if (!this.valSortPrice) {
      this.products.reverse();
    }
  }

    ngOnInit() {
      this.http.get('https://ssdev.superagent.ru/TestApp/Values/GetWithParent')
        .subscribe((data: any) => {
          for (let item of data) {
            this.productsType.push(item.group.name);
            for (let itemm of item.skus) {

              let a = itemm;
              a.type = item.group.name;
              a.checked = false;
              a.sold = false;
              a.hide = false;
              this.products.push(a);
            }
          };
        });
    }

  }
