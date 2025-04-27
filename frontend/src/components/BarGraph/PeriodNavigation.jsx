export const PeriodNavigation = ({
  isCurrentState,
  onPrev,
  onNext,
  prevText,
  nextText,
}) => {
  return (
    <div className='mr-3 text-lg text-right'>
      <button
        className="relative mr-4 before:content-[''] before:absolute before:top-2.5 before:-left-3 before:w-3 before:h-3 before:border-t-2 before:border-l-2 before:border-black before:-rotate-45"
        onClick={onPrev}
      >
        {prevText}
      </button>
      <button
        className={`${isCurrentState ? "text-gray-400 pointer-events-none before:border-gray-400" : null} relative mr-4 before:content-[''] before:absolute before:top-2.5 before:-right-3 before:w-3 before:h-3 before:border-t-2 before:border-l-2 before:border-black before:rotate-[135deg]`}
        onClick={onNext}
      >
        {nextText}
      </button>
    </div>
  );
};
