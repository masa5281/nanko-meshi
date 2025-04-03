import { IconContext } from "react-icons/lib";

export const IconProvider = (props) => {
  const {
    size,
    color,
    children
  } = props;

  return (
    <IconContext.Provider value={{ size, color }}>
      {children}
    </IconContext.Provider>
  );
};
