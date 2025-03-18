// モジュール
import { createFoodFormData, getFoodsApi } from "../../api/foodApi";
import { axiosClient } from "../../config/axiosClient";
// ライブラリ
import { useEffect, useRef, useState } from "react";
import { IconContext } from "react-icons/lib";
import Modal from 'react-modal';
import ReactModal from "react-modal";
// アイコン
import { MdEdit } from "react-icons/md";
import { API_ENDPOINTS } from "../../utils/constants";

ReactModal.setAppElement('#root');

export const RegisterdFoodItem = () => {
  const [foodList, setFoodList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectFood, setSelectFood] = useState([]);
  const [foodImage, setFoodImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const inputRef = useRef(null);

  const modalStyle = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: "500px",
      height: "300px",
      borderRadius: "10px",
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

  const openModal = (food) => {
    setIsOpen(true);
    setSelectFood(food);
  };
  const closeModal = () => {
    setIsOpen(false);
    setPreviewImage("");
    setFoodImage("");
  };

  const handleUpdateFood = async () => {
    try {
      console.log(selectFood);
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
      console.log(error);
    }
  };

  // ボタン押下でinputが発火
  const handleInputFile = (e) => {
    e.preventDefault();
    inputRef.current.click();
  }

  // ファイル選択後、画像をプレビュー用とアップロード用に保存
  const onFileInputChange = (e) => {
    if (!e.target.files) return;

    const fileObject = e.target.files[0];
    setPreviewImage(URL.createObjectURL(fileObject));
    setFoodImage(fileObject);
  };

  return (
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="inline-block mb-8 px-5 py-3 bg-black rounded-full text-white text-4xl">登録した食品</h2>

      {selectFood && (
        <Modal
          isOpen={isOpen}
          style={modalStyle}
        >
          <div className="w-64 aspect-[4/3] mb-4 mx-auto border-2 border-black rounded-md ring-1 ring-black text-center overflow-hidden">
            <input type="file" className="hidden" ref={inputRef} onChange={onFileInputChange} />
            <button className="relative w-full h-full bg-gray-100 hover:brightness-110 transition-all duration-200" onClick={handleInputFile}>
              {previewImage ? (
                <img src={previewImage} alt="" className="w-full h-full" />
              ) : (
                selectFood.food_image && (
                  <img src={selectFood.food_image.url} alt="" className="w-full h-full" />
                )
              )}
            </button>
          </div>
          <input
            type="text"
            value={selectFood.name}
            onChange={(e) => setSelectFood({ ...selectFood, name: e.target.value })}
          />
          <input
            type="text"
            value={selectFood.calorie}
            onChange={(e) => setSelectFood({ ...selectFood, calorie: e.target.value })}
          />
          <button onClick={() => handleUpdateFood()}>更新</button>
          <button onClick={() => closeModal()}>閉じる</button>
        </Modal>
      )}

      <ul className="grid grid-cols-3 gap-14 px-20">
        {foodList.map((food, index) => {
          return (
            <li key={index} className="relative flex flex-col justify-center px-8 py-4 bg-white rounded-lg shadow-sm shadow-shadow">

              <div
                className="absolute top-3 right-3 p-0.5 rounded-full hover:bg-slate-500 hover:cursor-pointer"
                onClick={() => openModal(food)}
              >
                <IconContext.Provider value={{ size: 23 }}>
                  <MdEdit />
                </IconContext.Provider>
              </div>
              <div className="mb-3 border-b-2">
                <img src={food.food_image.thumb.url} alt="" className="mx-auto mb-3 rounded-lg" />
              </div>
              <p className="inline-block mb-3 bg-amber-500 rounded-lg text-white text-lg">{food.name}</p>
              <p className="text-lg"><span className="text-3xl">{food.calorie}</span>kcal</p>
            </li>
          )
        })}
      </ul>
    </div>
  );
};
