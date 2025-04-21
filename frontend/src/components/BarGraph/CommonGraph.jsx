export const CustomTick = ({
  x,
  y,
  payload,
  selectColor
}) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-17.5} y={-5} width={35} height={35} fill={selectColor(payload, "#FF3838", "#f0f0f0")} rx={100} ry={100} />
      <text x={0} y={13} dy={5} textAnchor="middle" fontSize={14} fill={selectColor(payload, "#fff", "#333")}>
        {payload.value}
      </text>
    </g>
  );
};

export const CustomLegend = ({ payload }) => {
  return (
    <ul className='text-left'>
      {
        payload.map((entry, index) => (
          <li key={`item-${index}`}>
            <span className='inline-block w-3 h-3 mr-1 bg-primary rounded-md'></span>
            {entry.value}
          </li>
        ))
      }
    </ul>
  );
};
