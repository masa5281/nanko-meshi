import { IconContext } from "react-icons/lib";

export const IconWrapper = (props) => {
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
