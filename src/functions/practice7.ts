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

export let date = parse1(ask() as string);

// parseの改良版
// ユーザーが入力した日付を検証する必要があるでしょう
// nullを返すのは、型安全な方法でエラーを処理するための最も軽量な方法です
// しかし、nullを返すだけだと、具体的なエラーメッセージが返されないので、デバッグの情報としては物足りない
export function parse1(birthday: string): Date | null {
  let date = new Date(birthday);
  if (!isValid(date)) {
    return null;
  }
  return date;
}

// 与えられた日付が有効かどうかチェックします
function isValid(date: Date) {
  return Object.prototype.toString.call(date) === '[object Date]' && !Number.isNaN(date.getTime());
};

