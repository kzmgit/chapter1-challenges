// ---電卓---
const display = document.getElementById('display');
let first_flag = 0;   //初めてボタンが押されたか管理するフラグ
let op_flag = 0;      //演算子が押されたか管理するフラグ
let displayValue = '';     //ディスプレイに表示する変数
let total = 0;        //計算結果をいれる変数
let op;               //演算子をいれる変数

// .は一つだけ入力できる
const inputDecimal = (dot) => {
  if(displayValue.indexOf('.') === -1) {
    if (first_flag === 0) {
      displayValue = total + dot;
      display.textContent = displayValue;
    } else {
      displayValue += dot
      display.textContent = displayValue;
    }
  }
}

//数字が押されたとき
const inputValue = (value) => {
  //初めて押されたのが「0」以外のとき
  if(!(first_flag === 0 && value === 0)) {
    first_flag = 1;
    displayValue += value;
    display.textContent = displayValue;
  }
}

//演算子 or = が押されたとき
const inputOperator = (operator) => {
  // 記号が押されたのが１回目だったら
  if(op_flag === 0){
    if(operator === '='){
      return ;
    } else {
      op_flag = 1;
      total = displayValue;
      op = operator;
      displayValue = '';
      display.textContent = total;
    }
  }
  // 記号が押されたのが２回目以降だったら
  else if (op_flag === 1){
    // 連続で記号が押されたら演算子を変える
    if (displayValue === '') {
      op = operator;
    } 
    else if(operator === '='){
      op_flag = 0;
      total = digitNum(eval(total + op + displayValue));
      display.textContent = total;
      displayValue = total;
    } else {
      total = digitNum(eval(total + op + displayValue));
      displayValue = '';
      display.textContent = total;
      op = operator;
    }
  }
}

//桁数は10桁まで表示する
const digitNum = (num) => {
  return Math.round(num * 100000000) / 100000000;
}

// +/-が押されたとき
const inputSign = () => {
  let tmp = display.textContent;
  displayValue = tmp * -1;
  display.textContent = displayValue;
}

// %が押されたとき
const inputPercent = () => {
  let tmp = display.textContent;
  displayValue = tmp / 100;
  display.textContent = displayValue;
}

// ACが押されたとき
const allCrear = () => {
  first_flag = 0;
  op_flag = 0;
  displayValue = '';
  total = 0;
  display.textContent = total;
}

// ---メモ---
const memoList = document.getElementById('memo-list');

// ボタンが押されるたびにdivを作成する
const addMemo = () => {
  const memoDiv = document.createElement('div');
  const memoTitle = document.createElement('input');
  memoTitle.setAttribute('type','text');
  memoTitle.setAttribute('size','10');
  memoTitle.setAttribute('placeholder','メモ');
  memoDiv.appendChild(memoTitle);
  const memoResult = document.createElement('p');
  memoResult.textContent = display.textContent;
  memoDiv.appendChild(memoResult);
  memoList.appendChild(memoDiv);
}

// メモをすべて削除する
const removeMemo = () => {
  while (memoList.hasChildNodes){
    memoList.removeChild(memoList.firstChild);
  }
}
