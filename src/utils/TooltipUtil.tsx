import { Tooltip } from 'react-tooltip';

type tooltipTypes = {
  backColor: string;
  fontColor: string;
};

function TooltipUtil({ backColor = '200', fontColor = '700' }: tooltipTypes) {
  return (
    <Tooltip
      id="tooltipid"
      style={{
        backgroundColor: `var(--color-grey-${backColor})`,
        color: `var(--color-grey-${fontColor})`,
        padding: '.2rem .8rem',
      }}
    />
  );
}

export default TooltipUtil;
