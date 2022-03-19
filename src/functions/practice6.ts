// サーバーから取得した既存のユーザー
export type ExistingUser = {
  id: number;
  name: string;
};

// サーバーにまだ保存されていない新規のユーザー
type NewUser = {
  name: string;
}

// JavaScript の delete 演算子は、オブジェクトからプロパティを削除します
// オプションを使うと、id?: number | undefinedという型になる
function deleteUser(user: { id?: number, name: string }) {
  delete user.id;
};

let existingUser: ExistingUser = {
  id: 123,
  name: 'Ima User'
};

deleteUser(existingUser);

// (property) id?: string | number | undefined
type LegacyUser = {
  id?: number | string;
  name: string;
};

let legacyUser: LegacyUser = {
  id: '123',
  name: 'Xin'
};

//deleteUser(legacyUser);
// => Argument of type 'LegacyUser' is not assignable to parameter of type '{ id?: number | undefined; name: string; }'.
//    Types of property 'id' are incompatible.
//    Type 'string | number | undefined' is not assignable to type 'number | undefined'.
//    Type 'string' is not assignable to type 'number | undefined'.ts(2345)

// ある変数を、後で変更することを許可する方法で(letやvarを使って)宣言する場合、

// その変数の型は、そのリテラル値から、そのリテラルが属するベースの型へと拡大されます。
let a = 'x'; // let a: string 'x'というリテラル型からstring型へと推論していく。具体的な型ではなく、より一般的な型を推論している。後で再代入されることを考慮して一般的な型へ拡大して推論している。
let b = 3; // let b: number
var c = true; // var c: boolean
const d = {x: 3}; // const d: { x: number; }

// イミュータブルな宣言では、再代入されることは無いので、リテラル型になる。具体的な型に推論される
// オブジェクトの場合、再代入ができるので、リテラル型にはならない。
const a1 = 'x'; // const a1: "x"
const b1 = 3; // const b1: 3
const c1 = true; // const c1: true
const d1 = {x: 3}; // const d1: { x: number; }

// 明示的な型アノテーションを使うと、型が拡大されるのを防ぐことができます。
// てか、型を推論されなくなる。
let a2: 'x' = 'x'; // let a2: "x"
let b2: 3 = 3; // let b2: 3
var c2: true = true; // var c2: true
const d2: {x: 3} = {x: 3} // const d2: { x: 3; }

// 拡大されない型を、letやvarを使って再割り当てすると、TypeScriptはそれを拡大します。
// その型を狭く保つようにTypeScriptに指示するには、元の宣言い明示的な型アノテーションを追加します。
const a3 = 'x'; // const a3: "x" a3は'x'というリテラル型
let b3 = a3; // let b3: string constで定義したリテラル型の変数をletで定義した変数に割り当てると、letで定義した変数はstring型になっちゃう。

// const定義時にアノテーションをつけとけば、
// letで定義した変数に割り当てても、letで定義した変数の型が拡大されない。
const c3: 'x' = 'x';
let d3 = c3; // let d3: "x"

// constアサーション
// constアサーションを使うと、狭く型を推論してもらえるかつその型のメンバーがreadonlyとなる
let a4 = {x: 3}; // let a4: { x: number; }
let c4 = {x: 3} as const // let c4: { readonly x: 3; }
// c4.x = 3 // => Cannot assign to 'x' because it is a read-only property.ts(2540)
let b4 = 3; // let b4: number
let d4 = 3 as const // let d4: 3
let e4 = [1, {x: 2}] // (number | {x: number})[]
let f4 = [1, {x: 2}] as const // let f4: readonly [1, { readonly x: 2; }]

type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
type Day = Weekday | 'Sat' | 'Sun';

function getNextDay(w: Weekday): Day | undefined {
  switch (w) {
    case 'Mon': return 'Tue';
  }
}

function isBig(n: number): true | undefined { // => Function lacks ending return statement and return type does not include 'undefined'.ts(2366)
  if (n >= 100) {
    return true;
  }
}

// 関数のブロック内に記述した処理が最後まで実行されると自動的に関数の呼び出し元に処理が戻りますので、
// 関数のブロックの最後に return 文を記述する必要はありません。
// return 文が実行されず、ブロックの最後まで到達して呼び出し元に戻る場合も undefined が返されます。
isBig(-1); // => undefined

type APIResponse = {
  user: {
    userId: string;
    friendList: {
      count: number;
      friends: {
        firstName: string;
        lastName: string;
      }[]
    }
  }
}

// 上のAPIResponseという型から、キーを指定して型を取得(ルックアップ)することができる。
type FriendList = APIResponse['user']['friendList'];

// numberでもいいし、0とか1でも良い
type Friend = FriendList['friends'][number];

// keyofを使うと、オブジェクトの全てのキーを、文字列リテラル型の合併として取得できます。
type ResponseKeys = keyof APIResponse; // type ResponseKeys = "user"
type UserKeys = keyof APIResponse['user'] // type UserKeys = "userId" | "friendList"
type FriendListKeys = keyof APIResponse['user']['friendList'] // type FriendListKeys = "count" | "friends"

// インデックスシグネチャ
type User = {
  name: string;
  email: string;
  // この部分がインデックスシグネチャ
  // friendというもは任意の言葉。任意の言葉の型はnumberかstringだけ。
  [friend: string]: string;
}

// マップ型

type Account = {
  id: number;
  isEmployee: boolean;
  notes: string[];
};

// Account型の全てのプロパティを省略可能にします
// keyofは、オブジェクトの全てのキーを、文字列リテラル型の合併として取得できます。
// Tには、'number', 'isEmployee', 'notes'が順に入っていく
// Account[T]のTに入っていく。Account[T]はルックアップ型
type OptionalAccount = {
  [T in keyof Account]?: Account[T];
};

// 全てのプロパティをnull許容にします。
type NullableAccount = {
  [T in keyof Account]: Account[T] | null;
};

// 全てのプロパティを読み取り専用にします。
type ReadOnlyAccount = {
  readonly [T in keyof Account]: Account[T];
};

// 全てのプロパティを再び書き込み可能にします(Accountと同等)。
// -演算子はmap型のみで利用できる
// ?やreadonlyを取り消すことができます
type Account2 = {
  -readonly [T in keyof ReadOnlyAccount]: Account[T];
};

// 全てのフィールドを再び必須にします
type Account3 = {
  [T in keyof ReadOnlyAccount]-?: Account[T];
}

let account1: Account2 = {
  id: 1,
  isEmployee: true,
  notes: ['a']
};

let account2: Account3 = {
  id: 2,
  isEmployee: false,
  notes: ['a']
};

// 条件型
// ジェネリック型パラメータTを取る新しい条件型IsStringを宣言します。
// この条件型の「条件」に当たる部分は、「T extends string」です。
// 「Tはstringのサブタイプですか？」と訪ねています。
// Tがstringのサブタイプであれば、型はtrue(リテラル型)となります。
// そうでなければ、型はfalse(リテラル型)となります。
// この3項式は値レベルではなく、型レベルである
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // type A = true
type B = IsString<number>; // type B = false

// 型エイリアスでジェネリック型パラメータを使う
// T[]はnumber[]やstring[]を一般化した配列の型
type ToArray<T> = T[];
type A1 = ToArray<number>; // type A1 = number[]
type B2 = ToArray<number | string> // type B2 = (string | number)[]

// 分配条件型
// 条件型は実際には何も行わない。その分岐はどちらも同じ型T[]になるからです
type ToArray2<T> = T extends unknown ? T[] : T[];
type A2 = ToArray2<number>; // type A2 = number[]
type A3 = ToArray2<number | string> // type A3 = string[] | number[]

type Foo = {
  a: number;
  b: string;
  c?: boolean;
};

type X = Foo["a"]; // type X = number
type Y = Foo["b"]; // type Y = string
type Z = Foo["c"]; // type Z = boolean | undefined

type ArrayFoo = number[];

type W = ArrayFoo[number]; // type W = number
type W1 = ArrayFoo[1] // type W1 = number

// 問題
// 初期化するときに変数に対してアノテーションをつける。
// そうすると、型推論されなくなる
let q1: number;
q1 = 1;

let q2: 1; // 1というリテラル型
// 型アサーションは、開発者が変数の型を断定して、コンパイラに押し付けること
// q2 = 2 as number; // Type 'number' is not assignable to type '1'.ts(2322)

let q3: number | string;
q3 = 'アイウエオ';

let q4: number;
// q4 = true; // Type 'boolean' is not assignable to type 'number'.ts(2322

let q5: (number | string)[];
q5 = [1, 2];

let q6: number[];
// q6 = [1, "アイウエオ"];　// Type 'string' is not assignable to type 'number'.ts(2322)

let q7: {a: boolean};
q7 = {a: true}

let q8: {a: {b:[number | string]}}
q8 = {a: {b: ['a']}};

let q9: (b: number) => string;
q9 = (x: number) => `${x}`;

class C {};

// Cは、Cクラスのインスタンス型
let c8: C = new C; // let c8: C
let c9 = new C;

// クラスそのもの自体の型を表したいなら、typeofをつける。
let c10: typeof C = C;

type O = {a: {b: {c: string}}};
let q10: keyof O; // let q10: "a";
type Obj = O['a']['b']; // type Obj = { c: string; }

// ジェネリック型パラメータにextendsを使うと、型を特定の型に限定できる。
// Excludeは組み込みの条件型
// Tに含まれているがUに含まれていない型を計算する
type Exclusive<T, U> = Exclude<T, U> | Exclude<U, T>;

let q11: Exclusive<1 | 2 | 3, 2 | 3 | 4>;

class A5 {
  methodA() {
    console.log("A");
  }
}

class B5 extends A5 {
  methodB() {
    console.log("B");
  }
}

class C5 extends B5 {
  methodC() {
    console.log("C");
  }
}

type TakeB5 = (arg: B5) => void;

// TakeBでは、関数の引数の型はB5が期待されている
// 実際に関数の引数の型はB5となる。代入される関数の引数の型が、代入される関数の引数の型になるわけではない。
//(arg: A5) => {};の{}内では、型A5のargのメソッドを呼び出されるかもしれない。なので、このargに型B5の値を入れれば、
// 型B5は型A5のサブタイプなので、クラスA5に定義されたメソッドを呼び出せる。なので、辻褄が合う。
// (arg: C5) => {};の{}内では、型C5のargのメソッドが呼び出されるかもしれない。型B5の値では、型C5のメソッドを呼び出すことができないので、
// アノテーションで推測している型B5の引数だと、代入された関数の処理内でエラーを引き起こす可能性があるので、エラーが出ている。
const foo: TakeB5 = (arg: A5) => {}; // ok
const bar: TakeB5 = (arg: B5) => {}; // ok
// const baz: TakeB5 = (arg: C5) => {}; // Property 'methodC' is missing in type 'B' but required in type 'C'.ts(2322)

foo(new B5());
// foo(new A5()); // Argument of type 'A5' is not assignable to parameter of type 'B5'.Property 'methodB' is missing in type 'A5' but required in type 'B5'
