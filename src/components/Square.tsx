import { ReactNode } from 'react';

type Props = {
  index: number;
  onClick: (event: any) => void;
  player: ReactNode;
};

const Square = ({ player, index, onClick }: Props) => {
  const scale = player ? 'scale-100' : 'scale-0';
  const textColor = player === 'X' ? 'text-yellow-200' : 'text-fuchsia-300';
  const hoverStyle = 'transition duration-500 hover:scale-105 transform';

  return (
    <div
      onClick={onClick}
      data-cell-index={index}
      className={`h-36 border-solid border-4 border-slate-200 font-display text-7xl text-center flex justify-center items-center cursor-pointer ${hoverStyle}`}>
      <span
        data-cell-index={index}
        className={`transform transition-all duration-150 ease-out ${scale} ${textColor}`}>
        {player}
      </span>
    </div>
  );
};

export default Square;
