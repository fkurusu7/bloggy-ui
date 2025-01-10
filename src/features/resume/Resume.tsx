import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiOutlineX,
  AiOutlineHtml5,
  AiOutlineJavaScript,
  AiOutlineJava,
  AiOutlinePython,
  AiOutlineRead,
} from 'react-icons/ai';
import { FaNodeJs, FaReact, FaDocker, FaCss3 } from 'react-icons/fa';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { HiOutlineBackspace, HiOutlineCodeBracket, HiOutlineFlag } from 'react-icons/hi2';
import { MdOutlineDirectionsBike } from 'react-icons/md';
import { PiPersonSimpleHike } from 'react-icons/pi';
import { VscVscodeInsiders } from 'react-icons/vsc';
import Button from '../../component/Button';

function Resume() {
  return (
    <div className="resume__container">
      <Button goBack={true} variant="ghost">
        <HiOutlineBackspace />
      </Button>
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

        <aside className="resume__background">
          <div className="resume__background-option">
            <h3 className="resume__background-heading">Contact Info</h3>
            <ul>
              <li>
                <a
                  href="mailto:your.email@example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume__background-link"
                >
                  <AiOutlineMail /> <span>Email</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/fkurusu7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume__background-link"
                >
                  <AiOutlineGithub /> <span>Github</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume__background-link"
                >
                  <AiOutlineLinkedin /> <span>Linkedin</span>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/FerCuVa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume__background-link"
                >
                  <AiOutlineX /> <span>X</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="resume__background-option">
            <h3 className="resume__background-heading">Stack</h3>
            <ul>
              <li className="resume__background-stack">
                <FaReact />
                <span>React.js</span>
              </li>
              <li className="resume__background-stack">
                <FaNodeJs />
                <span>Node.js</span>
              </li>
              <li className="resume__background-stack">
                <VscVscodeInsiders />
                <span>VsCode</span>
              </li>
              <li className="resume__background-stack">
                <FaDocker />
                <span>Docker</span>
              </li>
            </ul>
          </div>
          <div className="resume__background-option">
            <h3 className="resume__background-heading">Languages</h3>
            <ul>
              <li className="resume__background-langs">
                <HiOutlineFlag />
                <span>English</span>
              </li>
              <li className="resume__background-langs">
                <HiOutlineFlag />
                <span>Spanish</span>
              </li>
              <li className="resume__background-langs">
                <AiOutlineHtml5 />
                <span>HTML</span>
              </li>
              <li className="resume__background-langs">
                <FaCss3 />
                <span>CSS</span>
              </li>
              <li className="resume__background-langs">
                <AiOutlineJavaScript />
                <span>Javascript</span>
              </li>
              <li className="resume__background-langs">
                <AiOutlinePython />
                <span>Python</span>
              </li>
              <li className="resume__background-langs">
                <AiOutlineJava />
                <span>Java</span>
              </li>
            </ul>
          </div>
          <div className="resume__background-option">
            <h3 className="resume__background-heading">Interests</h3>
            <ul>
              <li className="resume__background-langs">
                <HiOutlineCodeBracket />
                <span>Coding</span>
              </li>
              <li className="resume__background-langs">
                <MdOutlineDirectionsBike />
                <span>Biking</span>
              </li>
              <li className="resume__background-langs">
                <AiOutlineRead />
                <span>Reading</span>
              </li>
              <li className="resume__background-langs">
                <GiWeightLiftingUp />
                <span>Calisthenics</span>
              </li>
              <li className="resume__background-langs">
                <PiPersonSimpleHike />
                <span>Hiking</span>
              </li>
            </ul>
          </div>
        </aside>

        <main className="resume__experience">
          <div className="resume__experience-container">
            <h2>Work Experience</h2>
            <section className="resume__experience-jobs">
              <section className="resume__experience-job">
                <article className="resume__experience-where">
                  <h3>Freelance</h3>
                  <i>Mexico</i>
                  <p>
                    Jan, 2023 <span>-</span> Present
                  </p>
                </article>
                <article className="resume__experience-description">
                  <h3>Web Developer (Full-Stack)</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis quaerat
                    dolorum itaque consequuntur voluptas. Necessitatibus velit eius, quam
                    blanditiis, modi consequatur vero deserunt sapiente iusto non debitis? Labore,
                    totam.
                  </p>
                </article>
              </section>
              <section className="resume__experience-job">
                <article className="resume__experience-where">
                  <h3>Morgan Stanley</h3>
                  <i>New York, USA</i>
                  <p>
                    Sep, 2019 <span>-</span> Jul, 2022
                  </p>
                </article>
                <article className="resume__experience-description">
                  <h3>Java Tech Lead</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis quaerat
                    dolorum itaque consequuntur voluptas. Necessitatibus velit eius, quam
                    blanditiis, modi consequatur vero deserunt sapiente iusto non debitis? Labore,
                    totam.
                  </p>
                </article>
              </section>
              <section className="resume__experience-job">
                <article className="resume__experience-where">
                  <h3>Morgan Stanley</h3>
                  <i>New York, USA</i>
                  <p>
                    Sep, 2019 <span>-</span> Jul, 2022
                  </p>
                </article>
                <article className="resume__experience-description">
                  <h3>Java Tech Lead</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis quaerat
                    dolorum itaque consequuntur voluptas. Necessitatibus velit eius, quam
                    blanditiis, modi consequatur vero deserunt sapiente iusto non debitis? Labore,
                    totam.
                  </p>
                </article>
              </section>
              <section className="resume__experience-job">
                <article className="resume__experience-where">
                  <h3>Morgan Stanley</h3>
                  <i>New York, USA</i>
                  <p>
                    Sep, 2019 <span>-</span> Jul, 2022
                  </p>
                </article>
                <article className="resume__experience-description">
                  <h3>Java Tech Lead</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum officiis quaerat
                    dolorum itaque consequuntur voluptas. Necessitatibus velit eius, quam
                    blanditiis, modi consequatur vero deserunt sapiente iusto non debitis? Labore,
                    totam.
                  </p>
                </article>
              </section>
            </section>
          </div>
          <div className="resume__experience-container">
            <h2>Education</h2>
            <section className="resume__experience-education">
              <section className="resume__experience-school">
                <article className="resume__experience-where">
                  <h3>UNITEC</h3>
                  <i>Mexico City, Mexico</i>
                  <p>
                    Aug, 2004 <span>-</span> Aug, 2007
                  </p>
                </article>
                <article className="resume__experience-description">
                  <h3>Bachelor's Degree in Management Information Systems (MIS)</h3>
                  <p>
                    Information Technology, Business Administration, Systems Analysis, Database
                    Management, Business Process Management
                  </p>
                </article>
              </section>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Resume;
