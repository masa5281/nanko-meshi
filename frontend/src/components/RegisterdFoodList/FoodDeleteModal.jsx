// モジュール
import { useFoodApi } from "../../hooks/useFoodApi";
// ライブラリ
import { IconContext } from "react-icons/lib";
import Modal from 'react-modal';
import ReactModal from "react-modal";
// アイコン
import { IoIosClose } from "react-icons/io";
// モーダルのスタイル
import { modalStyle } from "../../theme/modalStyle"

ReactModal.setAppElement('#root');

export const FoodDeleteModal = (props) => {
  const {
    selectFood,
    isOpen,
    closeModal,
    setFoodList,
  } = props;
  const { deleteFood } = useFoodApi();

  const handleDeleteFood = async () => {
    try {
      await deleteFood(selectFood);
      setFoodList(prevFoodList =>
        prevFoodList.filter(food => food.id !== selectFood.id)
      );
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
};
