import {CategoryPageActions} from './actions';
import {CategoryPageTests} from './tests';
import {CategoryPageItems} from './items';

export class CategoryPage {
  constructor() {
    this.tests = new CategoryPageTests();
    this.actions = new CategoryPageActions();
    this.items = new CategoryPageItems();
  }
}