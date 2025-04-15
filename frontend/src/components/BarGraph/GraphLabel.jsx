export const GraphLabel = ({
  labelName,
  graphName,
  graphType,
  setGraphType
}) => {

  return (
    <label
      className={`${graphName === graphType ? "text-white bg-redBar" : null} inline-block w-1/3 h-8 bg-gray-300 rounded-t-md leading-8 cursor-pointer`}
      onClick={() => setGraphType(graphName)}
    >
      {labelName}
    </label>
  );
};
