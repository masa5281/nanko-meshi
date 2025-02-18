export const IconList = (props) => {
  const { img, alt, menuName } = props;
  return (
    <li className="w-28 h-full">
      <a href="#" className="flex flex-col items-center transition-all duration-200 hover:bg-primary-light px-3 h-full">
        <div className="w-10">
          <img src={img} alt={alt} className="h-10 object-contain" />
        </div>
        <p className="text-white text-xs font-bold">{menuName}</p>
      </a>
    </li>
  );
}
