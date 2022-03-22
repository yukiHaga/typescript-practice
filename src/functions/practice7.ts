// promptで、ユーザにテキストを入力することを促すメッセージを持つダイアログを表示します。
// promptの引数は、ダイアログに表示するメッセージ
// ユーザーが何か入力してOKを押した場合、入力した文字列が戻り値として返される
// ユーザーが何も入力しないでOKを押した場合、空文字が戻り値として返される

import { isValidElement } from "react";

// ユーザーがキャンセルボタンをクリックした場合、nullを返す
export function ask() {
  return prompt('When is your birthday?');
}

// Dateコンストラクタは、JavaScript の Date インスタンスを生成する
// birthdayが空文字(何も入力せずにOKを押す)だと、new DateでInvalid Dateが出力される→ toISOStringが使えなくてエラーが起こる
// birthdayがnull(キャンセルを押す)だと、birthdayにnullが渡される
// new Date(null)だと、日本標準時間が返される。Thu Jan 01 1970 09:00:00 GMT+0900 (Japan Standard Time)
export function parse(birthday: string): Date {
  console.log(birthday);
  console.log(new Date(birthday));
  return new Date(birthday);
}

// カスタムエラー型
// TypeScriptでは、クラスを定義すると、型も定義される
// クラス内にコンストラクタを省略しても、自動的に空のコンストラクタが作成される
export class InvalidDateFormatError extends RangeError {};
export class DateIsInTheFutureError extends RangeError {};

// parseの改良版
// throw文を使うとユーザーが例外を投げることができます。 例外として投げられたオブジェクトは、catch節で関数の引数のようにアクセスできます。
// throw文ではエラーオブジェクトを例外として投げることができます。
// RangeErrorは指定された値が許容範囲を超えていることを表す
export function parse1(birthday: string): Date {
  let date = new Date(birthday);
  // isValidで与えられた値がnullかどうかチェックする
  // RangeErrorコンストラクターは、インスタンスを生成します
  // 第一引数には、人間が読むためのエラーの説明が入る
  if (!isValid(date)) {
    throw new InvalidDateFormatError('Enter a date in the form YYY/MM/DD')
  }
  if (date.getTime() > Date.now()) {
    throw new DateIsInTheFutureError('Are you a timelord?');
  }
  return date;
}

// 与えられた日付が有効かどうかチェックします
// callメソッドは、暗黙的に渡されるthisの値を明示的にして、関数を呼び出すことができる。this以外に引数も関数に渡すことができる。
// dateの値をthisの値として、Object.prototype.toStringを呼び出している。
function isValid(date: Date) {
  return Object.prototype.toString.call(date) === '[object Date]' && !Number.isNaN(date.getTime());
};




