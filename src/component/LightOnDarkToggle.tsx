import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useLightOnDarkMode } from '../context/LightOnDarkMode';

function LightOnDarkToggle() {
  const { isDarkMode, toggleLightOnDarkMode } = useLightOnDarkMode();

  return (
    <button className="header-admin__btn-icon" onClick={toggleLightOnDarkMode}>
      {isDarkMode ? <HiOutlineSun className="light" /> : <HiOutlineMoon className="dark" />}
    </button>
  );
}

export default LightOnDarkToggle;
