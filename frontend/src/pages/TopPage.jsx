import { Link } from "react-router-dom";

export const TopPage = () => {
  return (
    <>
      <section>
        <div>
          <img src="" alt="" />
        </div>
      </section>

      <section>
        <h2>こんなお悩みありませんか？</h2>
        <div>
          <img src="" alt="" />
          <p>運動してカロリーは消費したけど、イマイチ達成感がないかも？</p>
        </div>
        <div>
          <img src="" alt="" />
          <p>この努力、もっと別の“何か”で評価されたい！</p>
        </div>
      </section>

      <section>
        <div>
          <h2>あなたの消費カロリー、食べ物の個数で置き換えてみませんか？</h2>
          <p>「なんこメシ」は運動で消費したカロリーを食品の個数に換算できます。</p>
          <div>
            <p>例えば・・・</p>
            <ul>
              <li>ランニングで消費した400kcalはポテチ1.2個分</li>
              <li>筋トレで消費した100kcalはアイス0.5個分</li>
              <li>ヨガで消費した200kcalはラーメン0.4個分</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div>
          <h2>アプリの主な使い方</h2>
          <ul>
            <li>
              <h3>カロリー入力</h3>
              <img src="" alt="" />
              <p>
                運動で消費したカロリーと日付を入力。
                カロリーが分からない場合、
                METsによる目安カロリーが計算できます。
              </p>
            </li>
            <li>
              <h3>食品個数に換算</h3>
              <img src="" alt="" />
              <p>
                カロリー入力後、
                あなたが消費したカロリーが
                食品の個数に換算されます。
              </p>
            </li>
            <li>
              <h3>食品登録</h3>
              <img src="" alt="" />
              <p>
                自分がよく食べる食品を登録して、
                個数換算の対象にできます。
              </p>
            </li>
            <li>
              <h3>お気に入り機能</h3>
              <img src="" alt="" />
              <p>
                他のユーザーが登録している食品を
                お気に入り登録して、
                個数換算の対象にできます。
              </p>
            </li>
          </ul>
        </div>
      </section>

      <footer>
        <nav>
          <ul>
            <li><Link>利用規約</Link></li>
            <li><Link>プライバシーポリシー</Link></li>
          </ul>
        </nav>
        <div>
          <small>&copy; 2025 なんこメシ</small>
        </div>
      </footer>
    </>
  );
};
