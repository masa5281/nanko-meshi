// コンポーネント
import { InputValidateErrors } from "./InputValidateErrors";
// ライブラリ
import { useFormContext } from "react-hook-form";
import { IconContext } from "react-icons/lib";
import { ErrorMessage } from "@hookform/error-message"
// カスタムフック
import { useValidateError } from "../../context/ValidateErrorContext";
import { useFormUtils } from "../../hooks/useFormUtils";

export const InputField = (props) => {
  const { validateErrors } = useValidateError();
  const { onChangeToText } = useFormUtils();
  
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
    handleOnChange
  } = props;
  
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-center pl-3 font-bold">
        <IconContext.Provider value={{ size: 20 }}>
          <div className="mr-0.5">
            {iconComponent}
          </div>
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
          onChange: (e) => {
            if (handleOnChange) {
              handleOnChange(e, columnName);
            }
            onChangeToText(e, fieldName);
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
