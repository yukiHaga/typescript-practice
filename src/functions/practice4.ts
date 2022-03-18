import { keyword } from "chalk";
import { boolean } from "yargs";

export const func1 = (n: number): number => {
  return n * n;
};

// オプションパラメータ
export const func2 = (a: number, b?: number): void => {
  console.log(a, b);
}

// デフォルトパラメータ
// bにデフォルト値を与えると、オプションのアノテーションである?がなくなる
// そして、TypeScriptはデフォルト値からパラメータの型を推論できるので、型を明示的につける必要がなくなる
export const func3 = (a: number, b = 5): number => {
  return a * 5;
}

// レストパラメータ
// この関数の引数は、可変長引数である
export const func4 = (...numbers: number[]): number => {
  return numbers.reduce((total, n) => total + n, 0);
}

// レストパラメータの例2
export const func5 = (...numbers: number[]): void => {
  console.log(numbers);
}

// 呼び出しシグネチャ
// const greet: (name: string) => void
// これってよくよくみたら、関数greetの型は、呼び出しシグネチャで表現されている
export const greet = (name: string): void => {
  console.log(name);
};

// 型エイリアスで書くと、関数greetの型は以下のように書ける(呼び出しシグネチャ)
type Greet = (name: string) => void;

// 型シグネチャを型エイリアスとして定義する
type Log = (message: string, userId?: string) => void;

// userIdにデフォルト値を追加しました。このようにした理由は、Logのシグネチャの中でuserIdの型を指定しましたが、
// Logは型であり、値を保持することはできないので、Logの一部としてデフォルト値を指定することができなかったからです。
let log: Log =(message, userId = '123') => {
  console.log(message, userId);
}

type Log1 = {
  (message: string, userId?: string): void
}

export const getMonth = (date: Date): number => {
  return date.getMonth();
};

// ポリモーフィズムの例

// この型の場合、numberを要素にもつ配列にしかfilterを使えない
type Filter = {
  (array: number[], f: (item: number) => boolean): number[];
};

// ジェネリック型パラメータを使う
// Tがジェネリック型パラメータである
type Filter2 = {
  <T>(array: T[], f: (item: T) => boolean): T[];
}

// フィルター関数を定義する
// Filter2で定義されている型は、事前に分からない。
// filterを呼び出すときに、TypeScriptに推論してもらう。
// TypeScriptは、私たちがarrayに対して渡す型からTを推論します。
// filterの特定の呼び出しについて、Tが何であるかをTypeScriptが一旦推論すると、
// TypeScriptはfilterの型シグネチャに現れる全てのTを、その型で置き換えます。
// Tはプレースホルダーの型のようなものであり、型チェッカーによって文脈から埋められます。
export const filter: Filter2 = (array, f) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let item = array[i];
    if(f(item)) {
      result.push(item);
    }
  }
  return result;
};

// 型エイリアスの明示的な記法
// map関数の場合、入力の型と出力の型が同じとは限らない。
// ジェネリック型パラメータは複数定義できる
type Map = {
  <T, U>(array: T[], f: (item: T) => U): U[];
};

// この関数のunknownをなんらかの型に置き換えて、mapをどのようにジェネリックにするか考える。
// unknownの部分をジェネリック型パラメータTにすればいいのか
export const map: Map = (array, f) => {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i]);
  }
  return result;
}

// ジェネリックス型パラメータを型エイリアスで使う
// 型エイリアスで使う場合、型エイリアス名の隣に記述するしかできない。
// 呼び出しシグネチャが絡んでくると、型エイリアスの内部でジェネリック型パラメータを宣言しても問題ない。
// 以下の場合、この型エイリアスを使うタイミングでTをバインドさせないとダメ。
// TypeScriptは、プログラマーがジェネリックを使用するときに、具体的な型をジェネリックにバインドするからである。
type MyEvent<T> = {
  target: T;
  type: string;
};

let myEvent: MyEvent<HTMLButtonElement | null> = {
  target: document.querySelector('#myButton'),
  type: 'click'
}

// MyEventを使って別の型を作成することができます
// TimeEventのジェネリックTがバインドされるときに、TypeScriptはそれをMyEventにもバインドします。
type TimeEvent<T> ={
  event: MyEvent<T>;
  fron: Date;
  to: Date;
};

// 型引数に制約をつける
// TypeScriptではextendsキーワードを用いることでジェネリクスの型Tを特定の型に限定することができます。
// 今回の例では<T extends HTMLElement>とすることで型Tは必ずHTMLElementまたはそのサブタイプの
// HTMLButtonElementやHTMLDivElementであることが保証されるためstyleプロパティに安全にアクセスできるようになります。
export function changeBackgroundColor<T extends HTMLElement>(element: T) {
  element.style.backgroundColor = "red";
  return element;
};

// ジェネリック型パラメータにデフォルト値を設定することができる。
export function chnageFontColor<T extends HTMLElement = HTMLElement>(element: T) {
  element.style.color = "red";
  return element;
};

type Reservation = unknown;

// 明示的な型シグネチャ(関数自身の型)の書き方
// Reserveは型シグネチャの合併型になるが、TypeScriptはこの合併型を推論することができないので、
// 関数を作成するときに、パラメータにこの合併型を満たすようなアノテーションをつける。
// 単体の型シグネチャなら、関数のパラメータにアノテーションをつけなくても、その情報を元に、TypeScriptがパラメータを型推論してくれる
// 本来なら、関数のパラメータにアノテーションをつけないとダメ。明らかに数値しか扱わない変数に文字列を入れられたりするから
type Reserve = {
  (from: Date, to: Date, destination: string): Reservation;
  (from: Date, destination: string): Reservation;
  (destination: string): Reservation;
};

// 後ろが省略可能なパラメータ(オプションパラメータ)なら、後ろから2番目のパラメータもオプションパラメータにしても良い
let reserve: Reserve = (
  fromOrDestination: Date | string,
  toOrDestination?: Date | string,
  destination?: string
) => {
  let x: unknown;
  console.log(x);
};

// 型で関数の概略を記述する
// ジェネリック型パラメータを、型シグネチャの部分で宣言した。そのため、関数呼び出し時に渡す引数の型によってジェネリックが推論される
// TypeScriptはこれらのジェネリックのバインドを、私たちが渡した引数の型から推論します
// ジェネリックを明示的にアノテートすることもできる。その場合、アノテートされているのでTypeScriptがジェネリックを推論しなくなる
type Is = <T>(a: T, b: T) => boolean;

export const is: Is = (a, b) => {
  return a === b;
};

