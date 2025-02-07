import MeHeader from './MeHeader';
import MeMain from './MeMain';
import Footer from '../blog/Footer';

function MeLayout() {
  return (
    <div className="container-me">
      <MeHeader />
      <MeMain />
      <Footer />
    </div>
  );
}

export default MeLayout;
