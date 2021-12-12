import {homePageActions} from './actions';
import { homePageTests } from './tests';

export class homePage {
  constructor() {
    this.actions = new homePageActions();
    this.tests = new homePageTests;
  }
}