import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'jscalculator-new';

  numberArray: string[] = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '.',
  ];
  operatorArray = ['+', '-', 'x', '/'];
  expression: string[] = [];
  operatorClicked = false;
  negativeAdded = false;

  click(val: string): void {
    if (val == 'C') this.clear();
    if (val == '=') this.equals();
    if (this.numberArray.indexOf(val) >= 0 || val == '-') {
      this.addToNumber(val);
      return;
    }
    if (this.operatorArray.indexOf(val) >= 0) this.insertOperator(val);
  }

  clear() {
    this.expression = [];
    this.operatorClicked = false;
  }

  equals() {
    if (this.operatorClicked) this.expression.pop();
    this.negativeAdded = false;
    console.log(this.expression.join(' '));
    console.log(eval(this.expression.join(' ')));
  }

  addToNumber(val: string) {
    let i = this.expression.length;

    if (i == 0 || this.operatorClicked) {
      this.expression.push(val);
      if (val == '-') this.negativeAdded = true;
    } else {
      let zeroStartRegex: RegExp = /^0$/gi;
      let decimalRegex: RegExp = /\./gi;
      if (zeroStartRegex.test(this.expression[i - 1]) && val == '0') return;
      if (decimalRegex.test(this.expression[i - 1]) && val == '.') return;

      this.expression[i - 1] += val;
    }
    this.operatorClicked = false;

    console.log(this.expression);
  }

  insertOperator(val: string) {
    if (this.negativeAdded && val != '-') {
      this.expression.pop();
      this.expression.pop();
    }
    if (this.operatorClicked) this.expression.pop();
    this.operatorClicked = true;
    this.expression.push(val);
    this.negativeAdded = false;

    console.log(this.expression);
  }
}
