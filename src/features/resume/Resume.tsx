import { AiOutlineGithub, AiOutlineLinkedin, AiOutlineMail, AiOutlineX } from 'react-icons/ai';

function Resume() {
  return (
    <div className="resume__container">
      <div className="resume__layout">
        <div className="resume__introduction">
          <div className="resume__introduction-profile">
            <h1>Fernando</h1>
            <h2>Cruz</h2>
            <p>
              My name is Fernando Cruz, a passionate and versatile full-stack developer who loves
              crafting digital solutions. With a strong foundation in front-end and back-end
              technologies, I bring creative problem-solving and a user-centric approach to every
              project.
            </p>
          </div>

          <img
            className="resume__introduction-image"
            src="/me_temp.png"
            alt="profile pic of Fernando"
          />
        </div>

        <aside className="resume__options">
          <div className="resume__options-option">
            <h3 className="resume__options-heading">Contact Info</h3>
            <ul>
              <li>
                <a
                  href="mailto:your.email@example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume__options-link"
                >
                  <AiOutlineMail /> <span>Email</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/fkurusu7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume__options-link"
                >
                  <AiOutlineGithub /> <span>Github</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume__options-link"
                >
                  <AiOutlineLinkedin /> <span>Linkedin</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/FerCuVa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume__options-link"
                >
                  <AiOutlineX /> <span>X</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="resume__options-option">
            <h3 className="resume__options-heading">Stack</h3>
            <ul>
              <li>React.js</li>
              <li>Node.js</li>
              <li>VsCode</li>
              <li>Docker</li>
            </ul>
          </div>
          <div className="resume__options-option">
            <h3 className="resume__options-heading">Languages</h3>
            <ul>
              <li>English</li>
              <li>Spanish</li>
            </ul>
          </div>
          <div className="resume__options-option">
            <h3 className="resume__options-heading">Interests</h3>
            <ul>
              <li>Biking</li>
              <li>Reading</li>
              <li>Calisthenics</li>
              <li>Coding</li>
            </ul>
          </div>
        </aside>

        <main className="resume__experience">Experience</main>
      </div>
    </div>
  );
}

export default Resume;
