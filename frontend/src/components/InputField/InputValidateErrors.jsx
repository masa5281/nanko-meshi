export const InputValidateErrors = (props) => {
  const { errors, column } = props;

  return (
    <>
      {errors && errors[column] && (
        errors[column].map((error, index) =>
          <p key={index} className="pl-2 text-error text-xs font-bold text-left">{error}</p>
        )
      )}
    </>
  );
};
