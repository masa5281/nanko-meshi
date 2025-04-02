// コンポーネント
import { InputValidateErrors } from "./InputValidateErrors";
import { IconWrapper } from "../IconWrapper";
// モジュール
import { onChangeToText } from "../../utils/formUtils";
// ライブラリ
import { useFormContext } from "react-hook-form";
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
    inputClassName = "",
    columnName,
    handleOnChange,
    disabled = false,
  } = props;
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-center pl-3 font-bold">
        <IconWrapper size={20}>
          <div className="mr-0.5">
            {iconComponent}
          </div>
          {labelName}
        </IconWrapper>
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`${inputClassName} w-full border-black border-2 rounded-full indent-2 focus:ring-2 focus:ring-primary focus:border-primary`}
        {...register(fieldName, {
          ...validationRule,
          onChange: (e) => {
            if (handleOnChange) {
              handleOnChange(e, columnName);
            }
            const halfWith = onChangeToText(e);
            setValue(fieldName, halfWith);
          }
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
