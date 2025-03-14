// ライブラリ
import { useFormContext } from "react-hook-form";
import { IconContext } from "react-icons/lib";
import { ErrorMessage } from "@hookform/error-message"
// カスタムフック
import { useValidateError } from "../FoodRegister/FoodRegisterForm";

export const InputField = (props) => {
  const validateErrors = useValidateError();

  const {
    type,
    placeholder,
    fieldName,
    validationRule,
    id,
    iconComponent,
    labelName,
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
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
        className="w-full border-slate-900 border-2 rounded-full indent-2 focus:ring-2 focus:ring-primary focus:border-primary"
        {...register(fieldName, validationRule)}
      />
      <ErrorMessage
        errors={errors}
        name={fieldName}
        render={({ message }) =>
          message ? (
            <p className="text-error text-xs font-bold">{message}</p>
          ) : null
        }
      />
      {validateErrors?.[fieldName] && (
        validateErrors[fieldName].map((error, index) =>
          error ? (
            <p key={index} className="text-error text-xs font-bold">{error}</p>
          ) : (
            null
          )
        )
      )}
    </div>
  );
};
