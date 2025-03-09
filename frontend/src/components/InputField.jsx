// ライブラリ
import { useFormContext } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import { useValidateError } from "./SignUp";
import { IconContext } from "react-icons/lib";

export const InputField = (props) => {
  const {
    type,
    placeholder,
    fieldName,
    validationRule,
    iconComponent
  } = props;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const validateErrors = useValidateError();

  return (
    <div className="relative mb-4">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full py-2 border-none rounded-full indent-8 focus:ring-2 focus:ring-secondary focus:border-secondary"
        {...register(fieldName, validationRule)}
      />
      <div className="absolute top-1 left-1 p-1 rounded-full bg-text">
        <IconContext.Provider value={{ size: 24, color: "white" }}>
          {iconComponent}
        </IconContext.Provider>
      </div>
      <ErrorMessage
        errors={errors}
        name={fieldName}
        render={({ message }) => message ? (<p className="text-errorYellow text-sm">{message}</p>) : null}
      />
      {validateErrors?.[fieldName] && (
        validateErrors[fieldName].map((error, index) => error ? <p key={index} className="text-errorYellow text-sm">{error}</p> : null)
      )}
    </div>
  );
};
