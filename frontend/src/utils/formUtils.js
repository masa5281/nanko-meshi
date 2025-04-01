// 入力値を全角→半角変換
export const onChangeToText = (e) => {
  const inputText = e.target.value;
  const toHalfWidth = inputText.replace(/[０-９]/g, (str) => String.fromCharCode(str.charCodeAt(0) - 0xFEE0));
  return toHalfWidth;
};

// フォームの体重リスト
export const setWeight = () => {
  const weights = [];
  for (let i = 20; i <= 150; i++) {
    weights.push(i);
  }
  return weights;
};

// プルダウンのプレースホルダーを制御
export const selectPlaceholder = (selectType, setIsTextPlaceholder) => {
  if (selectType === "") {
    setIsTextPlaceholder(true);
  } else {
    setIsTextPlaceholder(false);
  }
};
