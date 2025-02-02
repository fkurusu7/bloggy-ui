import { GiTacos } from 'react-icons/gi';
import { HiHeart } from 'react-icons/hi2';
import { PiCopyright } from 'react-icons/pi';

function Footer() {
  return (
    <footer className="blog__footer footer">
      <span className="footer__copy">
        {new Date().getFullYear()}
        <PiCopyright />
      </span>
      <span className="footer__heart">
        Made with <HiHeart />
      </span>
      <span>and</span>
      <span className="footer__tacos">
        <GiTacos />
        <GiTacos />
      </span>
    </footer>
  );
}

export default Footer;
