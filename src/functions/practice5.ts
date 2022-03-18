// チェスのエンジンを作成する
// 2人のプレイヤーが交互に駒を動かすためのAPIを提供します

import { string } from "yargs"

// チェスのゲームを表す
// 新しいゲームを始めるときに、チェス盤と駒を自動的に作成します。
export class Game {
  private pieces = Game.makePieces()

  // staticキーワードを使ってプロパティ/メソッドを定義すると、
  // newしてクラスのインスタンスを作らずとも、クラスのプロパティ、メソッドを使えます
  private static makePieces() {
    return [

    ]
  }
};

// 駒の位置(座標)
export class Position {
  constructor(
    private file: File,
    private rank: Rank
  ) {}
  distanceFrom(position: Position) {
    return {
      rank: Math.abs(position.rank - this.rank),
      file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0))
    }
  }
};

// チェスの駒
// ()内にはクラスからインスタンスを生成するときに使う引数を定義している
// abstractが指定されたクラスは、抽象クラスと呼ばれる(そのクラスを直接インスタンス化できなくなる)。
// 抽象クラスであるPieceを直接インスタンス化しようとすると、TypeScriptはエラーを出します
// 親クラスのメソッドをサブクラスでオーバーライドするように強制したい場合、abstract宣言をメソッドに使います
export abstract class Piece {
  protected position: Position

  constructor(
    private readonly color: Color,
    file: File,
    rank: Rank
  ) {
    this.position = new Position(file, rank)
  }

  moveTo(position: Position) {
    this.position = position
  }
  abstract canMoveTo(position: Position): boolean
};

// チェスには6種類の駒があります
// extendsによる継承は、プロトタイプチェーンを作っているだけ
// クラスは正確には「コンストラクタ」関数である
// あるクラスが抽象クラスを拡張しているに、抽象クラスに定義された抽象メソッド(abstractが指定されたメソッド)を実装し忘れていると、
// コンパイル時に型エラーとなる。
class King extends Piece {
  canMoveTo(position: Position) {
    let distance = this.position.distanceFrom(position)
    return distance.rank < 2 && distance.file < 2
  }
};
// class Queen extends Piece {};
// class Bishop extends Piece {};
// class Knight extends Piece {};
// class Rook extends Piece {};
// class Pawn extends Piece {};

// 駒を表すPieceクラスに、色と位置を追加しましょう
type Color = 'Black' | 'White';
type File = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H';
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

// 型エイリアス
type Food1 = {
  calories: number;
  tasty: boolean;
};

type Sushi1 = Food1 & {
  salty: boolean;
};

type Cake1 = Food1 & {
  sweet: boolean;
};

// 上の型エイリアスをインターフェースを使って書き直してみる
// インターフェース
// インターフェースは =　が必要じゃない
interface Food2 {
  calories: number;
  tasty: boolean;
};

// インターフェースでは、型演算子が使えない
// インターフェースを拡張するためには、extendsを使う
interface Sushi2 extends Food2 {
  salty: boolean;
}

interface Cake2 extends Food2 {
  sweet: boolean;
}

interface A1 {
  good(x: number): string;
  bad(x: number): string;
};

interface B1 extends A1 {
  good(x: string | number): string;
  // bad(x: string): string;
};
// Interface 'B1' incorrectly extends interface 'A1'.
// Types of property 'bad' are incompatible.
// Type '(x: string) => string' is not assignable to type '(x: number) => string'.
// Types of parameters 'x' and 'x' are incompatible.
// Type 'number' is not assignable to type 'string'.ts(2430)

// 上のインターフェースを型エイリアスで書き換えてみる
type A2 = {
  good(x: number): string;
  bad(x: number): string;
};

type B2 = A2 & {
  good(x: string | number): string;
  bad(x: string): string;
};

interface User {
  name: string;
}

interface User {
  age: number;
}

let user: User = {name: 'yuki', age: 25};
// => Property 'age' is missing in type '{ name: string; }' but required in type 'User'.

type User1 = {
  name: string;
};
/*
type User1 = { // => Duplicate identifier 'User1'.ts(2300)
  age: number;
}
*/

// 値
let a = 1999;
function b() {};

// 型
type a = number;
interface b {
  (): void;
};