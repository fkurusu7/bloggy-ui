import MeHeader from './MeHeader';

function Me() {
  return (
    <div className="container-me">
      <MeHeader />
      <main className="me-main">
        <section className="me-social">Resume - Blog | buttons</section>
        <section className="me-projects">projects</section>
        <section className="me-background">background (skilss, hobbies, stack)</section>
      </main>
      <footer className="me-footer">footer</footer>
    </div>
  );
}

export default Me;
