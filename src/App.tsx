import logo from './logo.svg';
import './App.css';
import { getNum } from './functions/practice3';
import { map, is } from './functions/practice4';

const App = () => {

  console.log(map([3, 5], (value) => value * 3)); // => [9, 15]
  // ジェネリクス型パラメータで型が定義された関数を呼び出すとき、
  // ジェネリクス型パラメータに対してアノテートすることができる
  // ジェネリックを使用するときに、具体的な型をジェネリックにバインドします
  // アノテートしているので、実引数による、ジェネリックの推論が発生しなくなる
  console.log(map<number, boolean>([3, 5], (value) => value === 3)); // => [true, false]

  console.log(is(true, true)); // => true
  console.log(is(true, false)); // => false
  console.log(is('string', 'otherstring')); // => false
  console.log(is(42, 42)); // => true
  // Argument of type 'string' is not assignable to parameter of type 'number'.
  // console.log(is(10, 'foo')); // => is(a: number, b: number): boolean

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
