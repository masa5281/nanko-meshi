// モジュール
import { createFoodFormData, deleteFoodApi, getFoodsApi } from "../../api/foodApi";
import { axiosClient } from "../../config/axiosClient";
// ライブラリ
import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons/lib";
import Modal from 'react-modal';
import ReactModal from "react-modal";
import { Dropdown } from "flowbite-react";
import { FormProvider, useForm } from "react-hook-form";
// アイコン
import { API_ENDPOINTS } from "../../utils/constants";
import { FaCamera } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { FaFire } from "react-icons/fa6";
import { BiSolidBowlRice } from "react-icons/bi";
// flowbite-reactのカスタムテーマ
import { foodCustomTheme } from "../../theme/theme";
import { InputField } from "../InputField/InputField";
// カスタムフック
import { useValidateError } from "../../context/ValidateErrorContext";
import { SubmitButton } from "../Button/SubmitButton";

ReactModal.setAppElement('#root');

export const RegisterdFoodItem = () => {
  const [foodList, setFoodList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectFood, setSelectFood] = useState({});
  const [foodImage, setFoodImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const inputRef = useRef(null);
  const [modalType, setModalType] = useState("");
  const { setValidateErrors } = useValidateError();

  const methods = useForm({
    mode: "onBlur",
    criteriaMode: "all",
  });
  const { handleSubmit, reset } = methods;

  const modalStyle = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    content: {
      position: "relative",
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: "350px",
      padding: "30px 40px",
      borderRadius: "10px",
      textAlign: "center",
    }
  };

  // 食品一覧を取得
  useEffect(() => {
    const getFoodList = async () => {
      try {
        const foodData = await getFoodsApi();
        setFoodList(foodData);
      } catch (error) {
        console.error(error);
      }
    }
    getFoodList();
  }, []);

  const openModal = (type, food) => {
    setSelectFood(food);
    setModalType(type);
    setIsOpen(true);
    // 編集フォームの初期値を設定
    if (type === "edit") {
      reset({
        foodName: food.name,
        foodCalorie: food.calorie
      }, { keepErrors: true });
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setPreviewImage("");
    setFoodImage("");
    setSelectFood("");
    document.querySelector("body").classList.remove("modal--open");
  };

  const handleUpdateFood = async () => {
    try {
      const data = await createFoodFormData(
        selectFood.name,
        selectFood.calorie,
        foodImage ? foodImage : selectFood.food_image
      );
      const response = await axiosClient.patch(`${API_ENDPOINTS.FOODS.BASE}/${selectFood.id}`, data);
      setFoodList(prevFoodList =>
        prevFoodList.map(food => food.id === selectFood.id ? response.data : food)
      );
      closeModal();
    } catch (error) {
      setValidateErrors(error.response.data);
    }
  };

  // ボタン押下でinputが発火
  const handleInputFile = (e) => {
    e.preventDefault();
    inputRef.current.click();
  }

  // 画像ファイル選択後、プレビュー用とアップロード用に保存
  const onFileInputChange = (e) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];
    setPreviewImage(URL.createObjectURL(fileObject));
    setFoodImage(fileObject);
  };

  const handleDeleteFood = async () => {
    try {
      await deleteFoodApi(selectFood.id);
      setFoodList(prevFoodList =>
        prevFoodList.filter(food => food.id !== selectFood.id)
      );
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOnChange = (e, columnName) => {
    setSelectFood(prev => ({ ...prev, [columnName]: e.target.value }));
  };

  return (
    <FormProvider {...methods}>
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="inline-block mb-8 px-5 py-3 bg-black rounded-full text-white text-3xl">登録した食品</h2>

        {/* モーダル */}
        {modalType === "edit" && selectFood && (
          <Modal
            isOpen={isOpen}
            style={modalStyle}
            bodyOpenClassName="modal--open"
          >
            <h3 className="inline-block w-full mb-4 pb-2 text-2xl text-black font-bold">食品情報を変更</h3>

            <form onSubmit={handleSubmit(handleUpdateFood)}>
              <div className="w-48 aspect-[4/3] mb-5 mx-auto rounded-md text-center overflow-visible">
                <input type="file" className="hidden" ref={inputRef} onChange={onFileInputChange} />
                <button className="relative w-full h-full hover:brightness-105 transition-all duration-200" onClick={handleInputFile}>
                  <div className="absolute -bottom-2 -right-2 p-2 bg-primary-deep rounded-full">
                    <IconContext.Provider value={{ size: 16, color: "white" }}>
                      <FaCamera />
                    </IconContext.Provider>
                  </div>
                  {previewImage ? (
                    <img src={previewImage} alt="" className="w-full h-full rounded-md object-cover" />
                  ) : (
                    selectFood.food_image && (
                      <img src={selectFood.food_image.url} alt="" className="w-full h-full rounded-md object-cover" />
                    )
                  )}
                </button>
              </div>
              <div className="flex flex-col gap-3">
                <InputField
                  id="foodName"
                  type="text"
                  placeholder="例：チョコレート"
                  fieldName="foodName"
                  iconComponent={<BiSolidBowlRice />}
                  labelName="食品名"
                  validationRule={{
                    required: "食品名を入力してください",
                    maxLength: { value: 20, message: "食品名は20文字以内で入力してください" }
                  }}
                  columnName="name"
                  handleOnChange={handleOnChange}
                />
                <InputField
                  id="foodCalorie"
                  type="text"
                  placeholder="例：300"
                  fieldName="foodCalorie"
                  iconComponent={<FaFire />}
                  labelName="食品のカロリー（kcal）"
                  validationRule={{
                    required: "カロリーを入力してください",
                    min: { value: 1, message: "カロリーは1以上で入力してください" },
                    max: { value: 9999, message: "カロリーは9999以下で入力してください" }
                  }}
                  columnName="calorie"
                  handleOnChange={handleOnChange}
                />
                <SubmitButton className="w-full" handleOnClick={handleUpdateFood}>更新</SubmitButton>
              </div>
            </form>

            <button
              onClick={() => closeModal()}
              className="absolute top-1 right-1 rounded-full transition-all duration-200 hover:bg-gray-200">
              <IconContext.Provider value={{ size: 30 }}>
                <IoIosClose />
              </IconContext.Provider>
            </button>
          </Modal>
        )}

        {/* 削除用のモーダル */}
        {modalType === "delete" && selectFood && (
          <Modal
            isOpen={isOpen}
            style={modalStyle}
            bodyOpenClassName="modal--open"
          >
            <p className="inline-block w-full mb-4 pb-2 text-2xl text-black font-bold">食品を削除しますか？</p>
            <button
              onClick={() => handleDeleteFood()}
              className="w-full inline-block relative mx-auto px-12 py-2 border-black border-2 rounded-full bg-delete text-white font-bold hover:bg-hover"
            >
              削除
            </button>
            <button
              onClick={() => closeModal()}
              className="absolute top-1 right-1 rounded-full transition-all duration-200 hover:bg-gray-200">
              <IconContext.Provider value={{ size: 30 }}>
                <IoIosClose />
              </IconContext.Provider>
            </button>
          </Modal>
        )}

        {/* ページ内 */}
        <ul className="grid grid-cols-3 gap-12 px-20">
          {foodList.map((food, index) => {
            return (
              <li key={index} className="relative px-8 py-4 bg-white rounded-lg shadow-sm shadow-shadow">
                <Dropdown label={
                  <div className="p-1.5 bg-gray-200 rounded-full hover:bg-hoverGray">
                    <BsThreeDots />
                  </div>
                }
                  arrowIcon={false}
                  inline={true}
                  theme={foodCustomTheme}
                >
                  <Dropdown.Item icon={FaPencilAlt} onClick={() => openModal("edit", food)}>編集</Dropdown.Item>
                  <Dropdown.Item icon={FaTrashAlt} onClick={() => openModal("delete", food)} className="text-delete">削除</Dropdown.Item>
                </Dropdown>

                <div className="mb-3 border-b-2">
                  <img src={food.food_image.thumb.url} alt="" className="mx-auto mb-3 rounded-lg" />
                </div>
                <p className="mb-3 text-black text-xl font-bold">{food.name}</p>
                <p className="inline-block mb-3 px-2 py-1 bg-primary-deep rounded-lg text-white text-lg"><span className="text-3xl">{food.calorie}</span>kcal</p>
              </li>
            )
          })}
        </ul>
      </div>
    </FormProvider>
  );
};
