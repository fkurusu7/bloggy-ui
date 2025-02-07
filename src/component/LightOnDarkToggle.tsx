import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useLightOnDarkMode } from '../context/LightOnDarkMode';

function LightOnDarkToggle() {
  const { isDarkMode, toggleLightOnDarkMode } = useLightOnDarkMode();

  return (
    <button
      className="header-admin__btn-icon"
      onClick={toggleLightOnDarkMode}
      data-tooltip-id="tooltipid"
      data-tooltip-content={isDarkMode ? 'Light mode?' : 'Dark mode?'}
      data-tooltip-place="left"
    >
      {isDarkMode ? <HiOutlineSun className="light" /> : <HiOutlineMoon className="dark" />}
    </button>
  );
}

export default LightOnDarkToggle;
