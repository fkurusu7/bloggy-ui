import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';
import { useLightOnDarkMode } from '../context/LightOnDarkMode';

function LightOnDarkToggle() {
  const { isDarkMode, toggleLightOnDarkMode } = useLightOnDarkMode();

  return (
    <button className="header-admin__btn-icon" onClick={toggleLightOnDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </button>
  );
}

export default LightOnDarkToggle;
