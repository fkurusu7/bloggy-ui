import { Link } from 'react-router-dom';
import { HiOutlineDocumentText, HiOutlineNewspaper } from 'react-icons/hi2';
import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineX } from 'react-icons/ai';

function MeCTA() {
  return (
    <>
      <section className="me-social__cta">
        <Link to={'/resume'} className="me-social__cta-link resume--btn">
          <HiOutlineDocumentText /> <span>See my Resume</span>
        </Link>
        <Link to={'/blog'} className="me-social__cta-link">
          <HiOutlineNewspaper />
          <span>Go to my Blog</span>
        </Link>
      </section>
      <section className="me-social__media">
        <a
          href="https://github.com/fkurusu7"
          target="_blank"
          rel="noopener noreferrer"
          className="me-social__media-link"
          aria-label="GitHub Profile"
        >
          <AiOutlineGithub />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="me-social__media-link"
          aria-label="LinkedIn Profile"
        >
          <AiOutlineLinkedin />
        </a>
        <a
          href="https://x.com/FerCuVa"
          target="_blank"
          rel="noopener noreferrer"
          className="me-social__media-link"
          aria-label="X Profile"
        >
          <AiOutlineX />
        </a>
      </section>
    </>
  );
}

export default MeCTA;
