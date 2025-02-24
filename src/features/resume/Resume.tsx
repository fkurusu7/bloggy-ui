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
import { HiOutlineCodeBracket, HiOutlineDocumentText, HiOutlineFlag } from 'react-icons/hi2';
import { MdOutlineDirectionsBike, MdSelfImprovement } from 'react-icons/md';
import { PiPersonSimpleHike } from 'react-icons/pi';
import { VscVscodeInsiders } from 'react-icons/vsc';
import Button from '../../component/Button';
import TooltipUtil from '../../utils/TooltipUtil';

function Resume() {
  return (
    <div className="resume__container">
      <div className="resume__layout">
        <ul className="resume__header">
          <li>
            <Button
              variant="linkicon"
              to="/me"
              tooltipmsg="ME page"
              tooltipplace="left"
              arialabel="Me Page"
            >
              <MdSelfImprovement />
            </Button>
          </li>
          <li>
            <Button
              variant="linkicon"
              to="/blog"
              tooltipmsg="Blog"
              tooltipplace="left"
              arialabel="Blog Page"
            >
              <HiOutlineDocumentText />
            </Button>
          </li>
        </ul>
        <div className="resume__introduction">
          <div className="resume__introduction-profile">
            <h1>Fernando</h1>
            <h2>Cruz</h2>
            <p>
              Full-stack developer merging technical expertise with creative problem-solving.
              Drawing from 15 years of experience at global leaders like Morgan Stanley and IBM
              Mexico, I craft end-to-end applications that make an impact. I specialize in creating
              seamless experiences across the JavaScript ecosystem, leveraging React and Node.js to
              transform complex challenges into elegant digital solutions.
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
                  <h3
                    data-tooltip-id="tooltipid"
                    data-tooltip-content="SVAM International, Inc"
                    data-tooltip-place="top"
                  >
                    Morgan Stanley
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
                  <h3
                    data-tooltip-id="tooltipid"
                    data-tooltip-content="Mexican Social Security Institute"
                    data-tooltip-place="top"
                  >
                    IMSS
                  </h3>
                  <i>Mexico City, Mexico</i>
                  <p>
                    Aug, 2009 <span>-</span> Mar, 2017
                  </p>
                </article>
                <article className="resume__experience-description">
                  <h3>Java Tech Lead</h3>
                  <p>
                    <strong
                      data-tooltip-id="tooltipid"
                      data-tooltip-place="right"
                      data-tooltip-delay-hide={1000}
                      data-tooltip-html="<strong>Softtek</strong> | SOA Architect 
                      <br />
                      <span class='tooltip__text'>Designed and implemented SOAP and REST web services architecture. Led development of JSON-to-XML transformation services for mobile applications. Conducted architecture reviews and established coding standards. Implemented comprehensive testing strategies including unit and integration testing.</span>
                      <br />
                      <strong>Novutek</strong> | Middleware Specialist
                      <br />
                      <span class='tooltip__text'>Architected ALSB façade systems for web service orchestration. Developed SOAP web services and WSDL contracts based on business requirements. Created integration solutions for Mainframe 3270 systems. Authored technical documentation and functional requirement specifications.</span>
                      <br />
                      <strong>Miracle Business Networking</strong> | Java Developer
                      <br />
                      <span class='tooltip__text'>Architected ALSB façade systems for web service orchestration. Developed SOAP web services and WSDL contracts based on business requirements. Created integration solutions for Mainframe 3270 systems. Authored technical documentation and functional requirement specifications.</span>
                      <br/>
                      <strong>Oracle Mexico</strong> | Java Developer
                      <br />
                      <span class='tooltip__text'>Developed SOAP web service interfaces and data service integrations. Implemented complex SQL queries and database operations. Managed WebLogic Server deployments in Linux environments.</span>
                      <br/>
                      <br/>
                      <p class='tooltip__tech-stack'>
                      <strong>Tech Stack:</strong> Java 1.6, Hibernate, Oracle DB, SOAP, ESB (ALSB), OSB, WebLogic Server, ALDSP, SQL, XQuery, WebLogic Server, Oracle Linux.
                      </p>
                      "
                      style={{ cursor: 'pointer' }}
                    >
                      Consulting Companies - <small style={{ color: '#dedc69' }}>hover me</small>
                    </strong>
                  </p>
                  <p>
                    Architected and developed enterprise integration solutions using SOAP/REST web
                    services and ESB patterns Designed and implemented service transformations
                    (JSON/XML) for mobile and legacy system integrations Built database solutions
                    utilizing SQL, Hibernate, and Oracle DB with focus on performance optimization
                    Managed WebLogic Server deployments across Linux environments and Mainframe 3270
                    systems Established technical standards through architecture reviews,
                    documentation, and comprehensive testing strategies
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
      <TooltipUtil />
    </div>
  );
}

export default Resume;
