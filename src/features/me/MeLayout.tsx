import MeHeader from './MeHeader';
import MeMain from './MeMain';
import Footer from '../blog/Footer';

function MeLayout() {
  return (
    <div className="container__body">
      <div className="container-me">
        <MeHeader />
        <MeMain />
        <Footer />
      </div>
    </div>
  );
}

export default MeLayout;
