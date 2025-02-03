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
                  <i>Mexico City, Mexico</i>
                  <p>
                    Jan, 2023 <span>-</span> Present
                  </p>
                </article>
                <article className="resume__experience-description">
                  <h3>Full Stack Developer | Freelance</h3>
                  <p>
                    Specialized in React Development, creating both personal and client solutions
                    capabilities. Built custom application for generating and managing Call for Bids
                    (CfB) documentation. Developed and maintained a comprehensive blog platform with
                    administrative. Created and deployed personal portfolio website and interactive
                    resume
                  </p>
                </article>
              </section>
              <section className="resume__experience-job">
                <article className="resume__experience-where">
                  <h3>
                    Morgan Stanley <span>- SVAM</span>
                  </h3>
                  <i>New York, USA</i>
                  <p>
                    Sep, 2019 <span>-</span> Jul, 2022
                  </p>
                </article>
                <article className="resume__experience-description">
                  <h3>Java Tech Lead</h3>
                  <p>
                    Lead development and maintenance of enterprise Java applications utilizing
                    Spring Core and RESTful architecture. Drive continuous improvement through
                    performance optimization and fault correction in mission-critical systems.
                    Manage CI/CD pipelines using TeamCity across Linux environments.
                  </p>
                  <p>Tech Stack: Java SE 8, Spring Core, DB2, TeamCity, Linux</p>
                </article>
              </section>
              <section className="resume__experience-job">
                <article className="resume__experience-where">
                  <h3>IBM</h3>
                  <i>Guadalajara, Mexico</i>
                  <p>
                    Dic, 2018 <span>-</span> Jul, 2019
                  </p>
                </article>
                <article className="resume__experience-description">
                  <h3>Java Developer</h3>
                  <p>
                    Architected and implemented RESTful services with Spring Boot and Spring Core
                    Developed data transformation pipelines handling JSON, Java beans, and Avro
                    schemas Built and maintained Kafka-based message processing systems Orchestrated
                    containerized deployments using Docker and OpenShift.
                  </p>
                  <p>Tech Stack: Java SE 8, Spring Boot, Couchbase, Kafka, Docker, GitLab</p>
                </article>
              </section>
              <section className="resume__experience-job">
                <article className="resume__experience-where">
                  <h3>IMSS - Mexican Social Security Institute</h3>
                  <i>Mexico City, Mexico</i>
                  <p>
                    Aug, 2009 <span>-</span> Mar, 2017
                  </p>
                </article>
                <article className="resume__experience-description">
                  <h3>Java Tech Lead</h3>
                  <p>
                    <strong>Softtek | SOA Architect </strong>
                    Designed and implemented SOAP and REST web services architecture Led development
                    of JSON-to-XML transformation services for mobile applications Conducted
                    architecture reviews and established coding standards Implemented comprehensive
                    testing strategies including unit and integration testing
                    <p>Tech Stack: Java 1.6, WebLogic Server, ESB, OSB, Oracle Linux</p>
                  </p>
                  <p>
                    <strong>Novutek | Middleware Specialist </strong>
                    Architected ALSB façade systems for web service orchestration Developed SOAP web
                    services and WSDL contracts based on business requirements Created integration
                    solutions for Mainframe 3270 systems Authored technical documentation and
                    functional requirement specifications.
                    <p>Tech Stack: Java 1.6, SOAP, ESB (ALSB), OSB, XQuery, WebLogic Server</p>
                  </p>
                  <p>
                    <strong>Miracle Business Networking | Java Developer</strong>
                    Developed SOAP web service interfaces and data service integrations Implemented
                    complex SQL queries and database operations Managed WebLogic Server deployments
                    in Linux environments
                    <p>Tech Stack: Java, WebLogic Server, ALSB, ALDSP, SQL, XQuery</p>
                  </p>
                  <p>
                    <strong>Oracle Mexico | Java Developer</strong>
                    Developed Java-based web service integrations using SOAP Implemented
                    Hibernate-based database operations for Oracle DB
                    <p>Tech Stack: Java, WebLogic Server, Hibernate, Oracle DB</p>
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
