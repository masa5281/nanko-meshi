import { Link } from "react-router-dom";


export const PasswordResetSuccess = () => {
  return (
    <div className="pt-12">
      <div className="max-w-md mx-auto px-8 py-6 bg-header rounded-md text-white text-center shadow-md shadow-shadow">
        <h2 className="mb-5 pb-2 border-b border-white text-3xl text-center">メールを送信しました</h2>
        <p className="mb-5">
          パスワード再設定に必要なメールを送信しました。<br/>
          メール記載のリンクをクリックし、<br/>
          再設定を完了してください。
        </p>
        <p className="mb-2">
          メールが届かない場合や紛失した場合は、<br/>
          以下より再送信してください。
        </p>
        <Link to={"/password_reset"} className="inline-block w-full mt-4 py-1 border-2 border-white rounded-full bg-primary text-white text-xl hover:bg-hover">メールを再送信する</Link>
      </div>
    </div>
  );
}
