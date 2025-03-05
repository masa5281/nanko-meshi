export const IconList = (props) => {
  const { link = "/", img, alt, menuName } = props;
  return (
    <li className="w-28 h-full">
      <a href={link} className="flex flex-col items-center h-full px-3 transition-all duration-200 hover:bg-primary-light">
        <div className="w-10">
          <img src={img} alt={alt} className="h-10 object-contain" />
        </div>
        <p className="text-white font-bold text-xs">{menuName}</p>
      </a>
    </li>
  );
}
