import { Tooltip } from 'react-tooltip';

type tooltipTypes = {
  backColor?: string;
  fontColor?: string;
};

function TooltipUtil({ backColor = '700', fontColor = '200' }: tooltipTypes) {
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
