// アノテーション(値: 型)を書かない場合、TSCがどのように値を型推論するか確認する
// TypeScriptが赤い波線を表示することを、「TypeError(型エラー)をスローする」と呼びます。
export const practice2 = () => {
  let a = 1 + 2; // aはnumber
  let b = a + 3; // bはnumber
  let c = { // cは特定の形状を持つオブジェクト
    apple: a,
    banana: b
  };
  let d = c.apple * 4; // dはnumber
  console.log(d);
};