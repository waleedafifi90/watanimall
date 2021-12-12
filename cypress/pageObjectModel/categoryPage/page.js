import {CategoryPageActions} from './actions';
import {CategoryPageTests} from './tests';

export class CategoryPage {
  constructor() {
    this.tests = new CategoryPageTests();
    this.actions = new CategoryPageActions();
  }
}