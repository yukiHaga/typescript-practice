// この関数は明らかに数値についてのみ機能します
// 数値以外のものをsquareOfに渡すと、不正な結果になります
// 仮引数に対して、アノテートしない場合、any型として扱われる
// パラメータ 'n' は暗黙のうちに 'any' 型を持つ。エラーが発生する
// 数値のみで機能することが明らかなので、アノテーションをつける
// これで、数値以外のものを渡してsquareOfを呼び出した場合、TypeScriptは、すぐにエラーを出さなければならないことを理解します。
export const squareOf = (n: number) => {
  return n * n;
}

export const getNum = () => {
  let a: unknown = 30 // => aに30が代入されているが、アノテーションによって、aはunknown型として明示的に型チェッカーに伝えている
  console.log(typeof a); // => プログラムが実際に実行されると、aはnumber型として出力される
  console.log(a); // => 30
  console.log(a === 30); // => true
  let b = a === 123; // unknown型の値と値を比較できる。 trueがbに代入されるので、bはboolean型の値としてTSCに認識される
  // let c = a + 10 // => Object is of type 'unknown'.ts(2571) unknown型は、+をサポートしていない
  if(typeof a === 'number') {
    let d = a + 10 // dはnumber型
  }
}

export const getBoolean = () => {
  const c = true; // => const c: true
  let e: true = true;
  // let f: true = false; // Type 'false' is not assignable to type 'true'.ts(2322)
};

// 合併型と交差型
export const getObject = () => {
  type Cat = { name: string, purrs: boolean};
  type Dog = { name: string, barks: boolean, wags: boolean};
  type CatOrDogOrBoth = Cat | Dog;
  type CatAndDog = Cat & Dog;

  // CatOrDogOrBoth型は、Cat型、Dog型、またはその両方を表す。
  let a: CatOrDogOrBoth = {
    name: 'Bonkers',
    purrs: true // 喉を鳴らす
  };

  // Dog
  a = {
    name: 'Domino',
    barks: true, // 吠える
    wags: true // 尻尾をふる
  }

  // 両方
  a = {
    name: 'Donkers',
    barks: true,
    purrs: true,
    wags: true
  }

  let b: CatAndDog = {
    name: 'Bob',
    purrs: true,
    barks: true,
    wags: true
  }
};

export const trueOrNull = (isTrue: boolean) => {
  if(isTrue) {
    return 'true';
  }
  return null;
}

export const getArray = () => {
  let a = [1, 2, 3]; // number[]
  var b = ['a', 'b']; // string[]
  let c: string[] = ['a']; // string[]
  let d = [1, 'a']; // (string | number)[]
  const e = [2, 'b']; // (string | number)[]

  let f = ['red']; // string[]
  f.push('blue');
  // f.push(true); // => Argument of type 'boolean' is not assignable to parameter of type 'string'.

  let g = []; // any[]
  g.push(1);
  g.push(true);

  let h: number[] = [];
  h.push(1);
  // h.push('red'); // => Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)

}

const buildArray = () => {
  let a = []; // any[]
  a.push(1); // number[]
  a.push('x'); // (number|string)[]
  return a;
}

let myArray = buildArray();
// myArray.push(true); // Argument of type 'boolean' is not assignable to parameter of type 'string | number'.ts(2345)

// b = ['queen', 'elizabeth', 'ii', 1926] // => Type 'string' is not assignable to type 'number'.ts(2322)

//タプル型の配列を要素に持つ配列の型をアノテーションしてる
let trainFares: [number, number?][] = [
  [3.75],
  [8.25, 7.70],
  [10.50]
]

// 上と同等です
// [number]または[number, number]型を要素とする配列の型をアノテーションしてる
let moreTrainFares: ([number] | [number, number])[] = [
  //...
]

// 少なくとも一つの要素(とそれに続く可変長の要素)を持つ、文字列のリスト
let friends: [string, ...string[]] = ['Sara', 'Tail', 'Chloe', 'Claire'];

// 不均一なリスト
let list: [number, boolean, ...string[]] = [1, false, 'a', 'b', 'c'];

// 読み取り専用の配列の型。オブジェクトのプロパティと同じでreadonlyをつける
let as: readonly number[] = [1, 2, 3];
// as[2] = 5; // => Index signature in type 'readonly number[]' only permits reading.ts(2542)

// 読み取り専用のタプル型
let bs: readonly [number, number] = [1, 3];

//
// bs[0] = 5; // => Cannot assign to '0' because it is a read-only property.ts(2540)



let a = 1042; // => number
let b = 'apple'; // => string

// constを使うことで、cには他の値が代入されないことが決まる
// そのため、TypeScriptはcに対して、最も狭い型を推論する
// そのため、cがリテラル型となる。
const c = 'pineapples'; // => pineapples
let d = [true, true, false]; // => boolean[]
let e = { type: 'ficus' }; // => { type: string }
let f = [1, false] // => [number, boolean]と定義しても良いし、(number | boolean)[]と定義しても良い。タプル型は固定長である。

// 配列の要素は再代入可能である。
//　そのため、constを使っても、最も狭い型を推論されることはない。
const g = [3] // => [number]または[number]

// ある変数を、後で変更することを許可する方法で(例えば、letやvarを使って)宣言する場合、
// その変数の型は、そのリテラル値から、そのリテラルが属するベースの型へと拡大される。
let h = null; // => null型じゃなくて、any型である。

// unknown値が特定の型であることを想定した事柄は行えません。
let l: unknown = 4;
// let m = l * 4;