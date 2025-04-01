// ライブラリ
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// アイコン
import { FaCalendarDays } from "react-icons/fa6";
// ロケールの変更
import { registerLocale } from "react-datepicker";
import { ja } from 'date-fns/locale/ja';

export const DateInput = (props) => {
  const { fieldName } = props;
  const { control, formState: { errors } } = useFormContext();

  // React Datepcikerの表示を日本語化
  registerLocale('ja', ja);

  return (
    <div>
      <label
        htmlFor="calendar"
        className="flex items-center pl-3 font-bold"><FaCalendarDays className="mr-0.5 text-lg"
        />
        日付
      </label>
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) =>
          <DatePicker
            id="calendar"
            className="border-slate-900 border-2 rounded-full indent-2 focus:ring-2 focus:ring-primary focus:border-primary"
            dateFormat="yyyy/MM/dd"
            locale="ja"
            selected={field.value}
            onChange={field.onChange}
          />
        }
      />
      <ErrorMessage
        errors={errors}
        name={fieldName}
        render={({ message }) =>
          message ? (
            <p className="pl-2 text-error text-xs font-bold text-left">{message}</p>
          ) : null
        }
      />
    </div>
  );
};
