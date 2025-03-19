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
import { FaCamera } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

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
      <h2 className="inline-block mb-8 px-5 py-3 bg-black rounded-full text-white text-3xl">登録した食品</h2>

      {/* モーダル */}
      {selectFood && (
        <Modal
          isOpen={isOpen}
          style={modalStyle}
          bodyOpenClassName="modal--open"
        >
          <h3 className="inline-block w-full mb-4 pb-2 text-2xl text-black font-bold">食品情報を変更</h3>
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
            <input
              type="text"
              value={selectFood.name}
              placeholder="例：チョコレート"
              onChange={(e) => setSelectFood({ ...selectFood, name: e.target.value })}
              className="border-black border-2 rounded-full indent-2 focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <input
              type="text"
              value={selectFood.calorie}
              placeholder="例：300"
              onChange={(e) => setSelectFood({ ...selectFood, calorie: e.target.value })}
              className="border-black border-2 rounded-full indent-2 focus:ring-2 focus:ring-primary focus:border-primary"
            />
            <button
              onClick={() => handleUpdateFood()}
              className="w-full inline-block relative mx-auto px-12 py-2 border-black border-2 rounded-full bg-primary text-white font-bold hover:bg-hover"
            >
              更新
            </button>
          </div>
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
      <ul className="grid grid-cols-3 gap-14 px-20">
        {foodList.map((food, index) => {
          return (
            <li key={index} className="relative flex flex-col justify-center px-8 py-4 bg-white rounded-lg shadow-sm shadow-shadow">

              <div
                className="absolute top-3 right-3 p-1 rounded-full transition-all duration-200 hover:bg-gray-200 hover:cursor-pointer"
                onClick={() => openModal(food)}
              >
                <IconContext.Provider value={{ size: 22 }}>
                  <MdEdit />
                </IconContext.Provider>
              </div>
              <div className="mb-3 border-b-2">
                <img src={food.food_image.thumb.url} alt="" className="mx-auto mb-3 rounded-lg" />
              </div>
              <p className="inline-block mb-3 bg-primary-deep rounded-lg text-white text-lg">{food.name}</p>
              <p className="text-lg"><span className="text-3xl">{food.calorie}</span>kcal</p>
            </li>
          )
        })}
      </ul>
    </div>
  );
};
