// コンポーネント
import { InputValidateErrors } from "../CalorieInput/InputValidateErrors";
// ライブラリ
import { useFormContext } from "react-hook-form";
import { IconContext } from "react-icons/lib";
import { ErrorMessage } from "@hookform/error-message"
// カスタムフック
import { useValidateError } from "../../context/ValidateErrorContext";

export const InputField = (props) => {
  const { validateErrors } = useValidateError();

  const {
    type,
    placeholder,
    fieldName,
    validationRule,
    id,
    iconComponent,
    labelName,
    className = "",
    columnName,
    onChange,
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-center pl-3 font-bold">
        <IconContext.Provider value={{ size: 20 }}>
          {iconComponent}
        </IconContext.Provider>
        {labelName}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full border-black border-2 rounded-full indent-2 focus:ring-2 focus:ring-primary focus:border-primary"
        {...register(fieldName, {
          ...validationRule,
          onChange: onChange
        })}
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
      <InputValidateErrors errors={validateErrors} column={columnName} />
    </div>
  );
};
