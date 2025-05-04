// ライブラリ
import { Dropdown } from "flowbite-react";
// アイコン
import { BsThreeDots } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
// flowbite-reactのカスタムテーマ
import { foodCustomTheme } from "../../theme/theme";

export const FoodEditMenu = ({ food, openFoodModal }) => {
  return (
    <Dropdown label={
      <div className="p-1.5 bg-gray-200 rounded-full hover:bg-hoverGray">
        <BsThreeDots />
      </div>
    }
      arrowIcon={false}
      inline={true}
      theme={foodCustomTheme}
    >
      <Dropdown.Item icon={FaPencilAlt} onClick={() => openFoodModal("edit", food)}>編集</Dropdown.Item>
      <Dropdown.Item icon={FaTrashAlt} onClick={() => openFoodModal("delete", food)} className="text-delete">削除</Dropdown.Item>
    </Dropdown>
  );
};
