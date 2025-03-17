import { useFormContext } from "react-hook-form";

export const useHalfWith = () => {
  const { setValue } = useFormContext();

  // 入力値を全角→半角変換
  const onChangeToText = (e, fieldName) => {
    const inputText = e.target.value;
    const toHalfWidth = inputText.replace(/[０-９]/g, (str) => String.fromCharCode(str.charCodeAt(0) - 0xFEE0));
    setValue(fieldName, toHalfWidth, { shouldValidate: true });
  };
  return { onChangeToText };
};
