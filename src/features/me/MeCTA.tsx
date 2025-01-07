import { Link } from 'react-router-dom';
import { HiOutlineDocumentText, HiOutlineNewspaper } from 'react-icons/hi2';

function MeCTA() {
  return (
    <section className="me-social__cta">
      <Link to={''} className="me-social__cta-link">
        <HiOutlineDocumentText /> <span>See my Resume</span>
      </Link>
      <Link to={''} className="me-social__cta-link">
        <HiOutlineNewspaper />
        <span>Go to my Blog</span>
      </Link>
    </section>
  );
}

export default MeCTA;
