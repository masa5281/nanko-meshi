export const InputValidateErrors = (props) => {
  const { errors, column } = props;

  return (
    <>
      {errors[column] && (
        <ul className="text-left">
          {errors[column].map((error, index) =>
            <li key={index} className="text-error text-xs font-bold">{error}</li>
          )}
        </ul>
      )}
    </>
  );
}
