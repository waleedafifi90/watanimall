import {MiniCartModalActions} from './actions';
import {MiniCartModalTests} from './tests';
import {MiniCartModalItems} from './items';

export class MiniCartModal {
  constructor() {
    this.tests = new MiniCartModalTests();
    this.actions = new MiniCartModalActions();
    this.items = new MiniCartModalItems();
  }
}