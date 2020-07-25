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
  display: any = 0;

  click(val: string): void {
    if (val == 'C') this.clear();
    if (val == '=') this.equals();
    if (
      this.numberArray.indexOf(val) >= 0 ||
      (val == '-' && this.operatorClicked)
    ) {
      this.addToNumber(val);
      return;
    }
    if (this.operatorArray.indexOf(val) >= 0) this.insertOperator(val);
  }

  clear() {
    this.expression = [];
    this.operatorClicked = false;
    this.display = 0;
  }

  equals() {
    if (this.operatorClicked) this.expression.pop();
    this.negativeAdded = false;
    this.display = this.evalExpression();
    this.expression = [this.display];
  }

  addToNumber(val: string) {
    let expressionLength = this.expression.length;

    if (expressionLength == 0 || this.operatorClicked) {
      this.expression.push(val);
      if (val == '-') this.negativeAdded = true;
    } else {
      if (val == '-') return;
      let zeroStartRegex: RegExp = /^0$/gi;
      let decimalRegex: RegExp = /\./gi;
      if (
        zeroStartRegex.test(this.expression[expressionLength - 1]) &&
        val == '0'
      )
        return;
      if (
        decimalRegex.test(this.expression[expressionLength - 1]) &&
        val == '.'
      )
        return;

      this.expression[expressionLength - 1] += val;
    }
    this.operatorClicked = false;
    this.display = this.expression[this.expression.length - 1];
    console.log(this.expression);
  }

  insertOperator(val: string) {
    if (this.negativeAdded && val != '-') {
      this.expression.pop();
      this.expression.pop();
    }
    if (this.operatorClicked) this.expression.pop();
    this.operatorClicked = true;
    if (val == 'x') val = '*';
    this.expression.push(val);
    this.negativeAdded = false;
  }

  evalExpression(): string {
    let operationOrder = ['/', '*', '-', '+'];

    let _expression = [...this.expression];

    for (let operator of operationOrder) {
      for (let i = 0; i <= _expression.length - 1; i++) {
        if (_expression[i] == operator) {
          let result: number = this.calculateImmediate(
            _expression[i - 1],
            _expression[i],
            _expression[i + 1]
          );
          _expression.splice(i - 1, 3, result.toString());
          console.log(_expression);
        }
      }
    }

    if ((_expression.length = 1)) {
      return _expression[0];
    }
  }

  calculateImmediate(a, op, b) {
    switch (op) {
      case '+':
        return parseFloat(a) + parseFloat(b);
      case '-':
        return parseFloat(a) - parseFloat(b);
      case '*':
        return parseFloat(a) * parseFloat(b);
      case '/':
        return parseFloat(a) / parseFloat(b);
    }
  }
}
