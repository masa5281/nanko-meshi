export const App = () => {
  return (
    <>
      <h2>消費したカロリーを入力!</h2>
      <p>運動で消費したカロリーを食べ物の個数に換算できます！</p>
      <div>
        <input type="number" placeholder="カロリーを入力してください" />
        <button>食べ物に換算</button>
      </div>
    </>
  );
}

export default App;
