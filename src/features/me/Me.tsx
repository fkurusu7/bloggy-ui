import { GiTacos } from 'react-icons/gi';
import { HiHeart } from 'react-icons/hi2';

import MeHeader from './MeHeader';
import MeMain from './MeMain';

function Me() {
  return (
    <div className="container-me">
      <MeHeader />
      <MeMain />
      <footer className="me-footer">
        Made with <HiHeart /> and
        <span>
          <GiTacos />
          <GiTacos />
        </span>
      </footer>
    </div>
  );
}

export default Me;
