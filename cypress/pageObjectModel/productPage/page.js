import {ProductPageActions} from './actions';
import {ProductPageTests} from './tests';
import {ProductPageItems} from './items';

export class ProductPage {
  constructor() {
    this.tests = new ProductPageTests();
    this.actions = new ProductPageActions();
    this.items = new ProductPageItems();
  }
}