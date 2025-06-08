export const TabLabel = ({
  selectTab,
  tabText,
  onSelectTab,
  children,
}) => {
  return (
    <button
      className={`${selectTab === tabText ? "text-white" : "text-black"} z-10 hover:cursor-pointer`}
      onClick={() => onSelectTab(tabText)}
    >
      {children}
    </button>
  );
};
