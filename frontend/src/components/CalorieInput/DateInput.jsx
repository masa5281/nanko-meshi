// ライブラリ
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// アイコン用
import { FaCalendarDays } from "react-icons/fa6";

// ロケールの変更
import { registerLocale } from "react-datepicker";
import { ja } from 'date-fns/locale/ja';

export const DateInput = (props) => {
  // React Datepcikerの表示を日本語化
  registerLocale('ja', ja);

  const { recordedDate, setRecordedDate } = props;
  return (
    <>
      <label htmlFor="calendar" className="flex items-center pl-3 font-bold"><FaCalendarDays className="mr-0.5 text-lg" />日付</label>
      <DatePicker id="calendar" className="p-3 border-slate-900 border-2 rounded-full indent-2 focus:ring-2 focus:ring-primary focus:border-primary" dateFormat="yyyy/MM/dd" locale="ja" selected={recordedDate} onChange={(date) => setRecordedDate(date)} />
    </>
  );
}