import { ICONS } from "./icons";

export interface Track {
  title: string;
  src: string;
}

export interface PortfolioItem {
  t: string;
  s: string;
  icon: string;
  body: string;
  tracks?: Track[];
}

export interface PortfolioCategory {
  id: string;
  label: string;
  icon: string;
  items: PortfolioItem[];
}

export const CATEGORIES: PortfolioCategory[] = [
  {
    id: "about",
    label: "profile",
    icon: ICONS.user,
    items: [
      {
        t: "Tauhidur Anjan",
        s: "CS Student & Developer · Buffalo, NY",
        icon: ICONS.user,
        body: `
          <h4>about</h4>
          <p>Computer Science graduate from the University at Buffalo with hands-on experience building and supporting full-stack software systems in both professional and academic settings.

My experience spans software engineering, data analysis, and technical support. I previously worked as a Global Technology Intern at AXA XL, where I supported enterprise data initiatives, contributed to cloud-based automation projects, and collaborated with international stakeholders to improve system accuracy and reliability. As a Software Engineering Fellow at Headstarter, I built full-stack applications using React, Node.js, Flask, and Firebase, gaining experience with APIs, automation, and collaborative development workflows.

In addition, I am a Co-Founder of UB AppDev, a 250+ member mobile and web development organization, where I led technical workshops, coordinated multi-team MVP projects, and mentored students in modern development practices. This role strengthened my leadership, communication, and ability to translate technical concepts to diverse audiences.

Technically, I work most comfortably with Python, Java, JavaScript, REST APIs, SQL, and modern web frameworks, and I enjoy roles that sit at the intersection of engineering, problem-solving, and customer impact.
</p>
          <h4>links</h4>
          <p>
            <a href="https://github.com/tauhiduranjan" target="_blank" rel="noopener">GitHub →</a>
            &nbsp;&nbsp;
            <a href="https://linkedin.com/in/tauhidur-anjan" target="_blank" rel="noopener">LinkedIn →</a>
          </p>
        `,
      },
      {
        t: "Resume",
        s: "Download · PDF",
        icon: ICONS.folder,
        body: `
          <h4>resume</h4>
          <p><a href="/Resume_TauhidurAnjan.pdf" target="_blank" rel="noopener">Download Resume (PDF) →</a></p>
        `,
      },
    ],
  },
  {
    id: "projects",
  label: "projects",
  icon: ICONS.folder,
  items: [
    {
      t: "Self-Funded Health Plan Admin Dashboard",
      s: "TypeScript · NestJS · PostgreSQL · React",
      icon: ICONS.folder,
      body: `
        <h4>self-funded health plan admin dashboard</h4>
        <p>A full-stack administrative dashboard for managing self-funded health plan data, focused on secure access control, auditability, and plain-language benefit insights.</p>
        <ul>
          <li>Designed a production-style full-stack application with NestJS services, REST APIs, JWT authentication, and role-based access control.</li>
          <li>Implemented PostgreSQL row-level security policies and audit logging triggers to make sensitive data access restricted and traceable.</li>
          <li>Integrated OpenAI to generate plain-language benefit explanations without exposing raw policy data directly to users.</li>
          <li>Containerized the application with Docker and maintained API specs, schema documentation, and an operational runbook.</li>
        </ul>
        <h4>stack</h4>
        <p>
          <span class="xmb-tag">TypeScript</span>
          <span class="xmb-tag">NestJS</span>
          <span class="xmb-tag">PostgreSQL</span>
          <span class="xmb-tag">React</span>
          <span class="xmb-tag">OpenAI</span>
          <span class="xmb-tag">Docker</span>
          <span class="xmb-tag">JWT</span>
        </p>
      `,
    },
    {
      t: "Federal Budget Analytics Dashboard",
      s: "Python · FastAPI · PostgreSQL · React",
      icon: ICONS.folder,
      body: `
        <h4>federal budget analytics dashboard</h4>
        <p>A full-stack analytics platform for exploring U.S. Treasury financial data through a cleaned data pipeline, normalized PostgreSQL schema, and REST API layer.</p>
        <ul>
          <li>Built an end-to-end data pipeline ingesting 5,800+ U.S. Treasury API records using Python and Pandas ETL.</li>
          <li>Designed a PostgreSQL backend with 10+ normalized tables, indexes, triggers, and stored procedures for structured financial analysis.</li>
          <li>Implemented FastAPI endpoints for cash balances, deficit tracking, and time-series financial metrics.</li>
          <li>Automated data cleaning, validation, testing, and deployment workflows with GitHub Actions CI/CD.</li>
        </ul>
        <h4>stack</h4>
        <p>
          <span class="xmb-tag">Python</span>
          <span class="xmb-tag">FastAPI</span>
          <span class="xmb-tag">PostgreSQL</span>
          <span class="xmb-tag">React</span>
          <span class="xmb-tag">TypeScript</span>
          <span class="xmb-tag">Pandas</span>
          <span class="xmb-tag">GitHub Actions</span>
        </p>
        <h4>links</h4>
        <p><a href="https://github.com/tauhiduranjan/federal-budget-analytics-dashboard" target="_blank" rel="noopener">GitHub →</a></p>
      `,
    },
    {
      t: "Last.fm Song Chart",
      s: "Music analytics · listening data visualization",
      icon: ICONS.link,
      body: `
        <h4>last.fm song chart</h4>
        <p>A music analytics project that visualizes Last.fm listening history and turns personal music data into readable charts and insights.</p>
        <ul>
          <li>Built a data visualization tool for exploring listening patterns, top tracks, and artist activity from Last.fm data.</li>
          <li>Designed the project around clean visual storytelling, making raw listening history easier to understand at a glance.</li>
          <li>Processed music metadata into chart-friendly structures for ranking songs, comparing listening behavior, and highlighting trends.</li>
        </ul>
        <h4>stack</h4>
        <p>
          <span class="xmb-tag">JavaScript</span>
          <span class="xmb-tag">Data Visualization</span>
          <span class="xmb-tag">Last.fm API</span>
          <span class="xmb-tag">Music Analytics</span>
        </p>
        <h4>links</h4>
        <p><a href="https://github.com/tauhiduranjan/lastfm-song-chart" target="_blank" rel="noopener">GitHub →</a></p>
      `,
    },
    {
      t: "BuffaLiving",
      s: "Student housing · 100+ users",
      icon: ICONS.home,
      body: `
        <h4>buffaliving</h4>
        <p>A student-focused housing marketplace for the University at Buffalo allowing users to list, search, and filter properties. Used by over 100 students. Features include interactive map-based property view, advanced search filters, real-time chat, and discussion forums.</p>
        <h4>stack</h4>
        <p>
          <span class="xmb-tag">React</span>
          <span class="xmb-tag">PHP</span>
          <span class="xmb-tag">MySQL</span>
          <span class="xmb-tag">JavaScript</span>
          <span class="xmb-tag">HTML</span>
          <span class="xmb-tag">CSS</span>
        </p>
        <h4>links</h4>
        <p><a href="https://github.com/cse442-at-ub/fa24-semesterproject-noproblems-1" target="_blank" rel="noopener">GitHub →</a></p>
      `,
    },
    {
      t: "Twitter Clone",
      s: "React · Firebase · real-time",
      icon: ICONS.link,
      body: `
        <h4>twitter clone</h4>
        <p>A real-time social media web app with tweet posting, liking, retweeting, and commenting features. Includes user profile creation with support for profile pictures, bios, and customizable settings.</p>
        <h4>stack</h4>
        <p>
          <span class="xmb-tag">JavaScript</span>
          <span class="xmb-tag">React</span>
          <span class="xmb-tag">Firebase</span>
          <span class="xmb-tag">Node.js</span>
        </p>
        <h4>links</h4>
        <p><a href="https://github.com/tauhiduranjan/Twitter-Clone-Headstarter" target="_blank" rel="noopener">GitHub →</a></p>
      `,
    },
    {
      t: "Punchline",
      s: "Letterboxd-style game reviews",
      icon: ICONS.game,
      body: `
        <h4>punchline</h4>
        <p>A Letterboxd-style social platform for gamers, allowing users to log, rate, and review video games. Designed with HCI and psychology principles to maximize usability and engagement.</p>
        <h4>stack</h4>
        <p>
          <span class="xmb-tag">Figma</span>
          <span class="xmb-tag">React</span>
          <span class="xmb-tag">HTML</span>
        </p>
        <h4>links</h4>
        <p><a href="https://github.com/CSE370HCI/punchline" target="_blank" rel="noopener">GitHub →</a></p>
      `,
      },
    ],
  },
 {
  id: "experience",
  label: "experience",
  icon: ICONS.briefcase,
  items: [
    {
      t: "AXA XL",
      s: "Global Technology Intern · June–Aug 2024",
      icon: ICONS.briefcase,
      body: `
        <h4>global technology intern</h4>
        <p>June 2024 – August 2024</p>
        <ul>
          <li>Developed ETL pipelines in PySpark and Databricks to migrate data from on-premises to Azure cloud.</li>
          <li>Collaborated with team members to ensure data accuracy and utilized Power BI and Excel to identify 40% of missing premiums, creating data visualizations that provided actionable insights for stakeholders.</li>
          <li>Analyzed and optimized key datasets to identify expansion opportunities in the US sector, supporting strategic decision-making and business growth initiatives.</li>
        </ul>
        <h4>stack</h4>
        <p>
          <span class="xmb-tag">Python</span>
          <span class="xmb-tag">PySpark</span>
          <span class="xmb-tag">Databricks</span>
          <span class="xmb-tag">Azure</span>
          <span class="xmb-tag">Power BI</span>
          <span class="xmb-tag">Excel</span>
          <span class="xmb-tag">Matplotlib</span>
          <span class="xmb-tag">Pandas</span>
          <span class="xmb-tag">SQL</span>
        </p>
      `,
    },
    {
      t: "University at Buffalo",
      s: "Teaching Assistant, CSE 420 · Aug–Dec 2025",
      icon: ICONS.layers,
      body: `
        <h4>teaching assistant — cse 420</h4>
        <p>August 2025 – December 2025</p>
        <ul>
          <li>Supported instruction for a project-based course where 61 students learned Unreal Engine and developed full 3D game prototypes.</li>
          <li>Guided students in scripting, asset management, level design, usability testing, and iterative project development.</li>
          <li>Provided feedback on labs and group projects, helping students strengthen technical skills, collaboration, and independent problem-solving.</li>
          <li>Fostered an inclusive learning environment by mentoring students through experimentation, teamwork, and modern game development practices.</li>
        </ul>
        <h4>focus areas</h4>
        <p>
          <span class="xmb-tag">Unreal Engine</span>
          <span class="xmb-tag">Game Development</span>
          <span class="xmb-tag">3D Prototyping</span>
          <span class="xmb-tag">Scripting</span>
          <span class="xmb-tag">Asset Management</span>
          <span class="xmb-tag">Level Design</span>
          <span class="xmb-tag">Usability Testing</span>
          <span class="xmb-tag">Mentorship</span>
        </p>
      `,
    },
    {
      t: "UB Mobile App Development Club",
      s: "Co-Founder & Secretary · Jan 2025–Dec 2025",
      icon: ICONS.bolt,
      body: `
        <h4>co-founder & secretary</h4>
        <p>January 2025 – December 2025</p>
        <ul>
          <li>Co-founded and scaled a 250+ member student developer community focused on building technical skills through hands-on app development.</li>
          <li>Planned and ran weekly GBMs, project meetings, speaker events, LeetCode sessions, logistics, promotion, and member communication, consistently driving 40+ attendees per event.</li>
          <li>Directed 30+ students in the development of 3 MVPs for clients, coordinating team responsibilities and supporting timely project delivery.</li>
          <li>Secured 10+ guest speakers by building relationships with industry professionals and expanding club programming.</li>
          <li>Recognized by the School of Engineering and Applied Sciences at UB for outstanding club growth, popularity, and impact.</li>
        </ul>
        <h4>focus areas</h4>
        <p>
          <span class="xmb-tag">Leadership</span>
          <span class="xmb-tag">App Development</span>
          <span class="xmb-tag">Project Management</span>
          <span class="xmb-tag">Event Planning</span>
          <span class="xmb-tag">Technical Mentorship</span>
          <span class="xmb-tag">Public Relations</span>
          <span class="xmb-tag">Client MVPs</span>
          <span class="xmb-tag">Community Building</span>
          <span class="xmb-tag">Swift</span>
          <span class="xmb-tag">React Native</span>
        </p>
      `,
    },
    {
      t: "Headstarter",
      s: "Software Engineering Fellow · June–July 2023",
      icon: ICONS.bolt,
      body: `
        <h4>software engineering fellow</h4>
        <p>June 2023 – July 2023</p>
        <ul>
          <li>Developed multiple full-stack web applications using React JS, Node JS, and Flask, collaborating in teams of 3 to build solutions like a resume parser with keyword matching, a multi-API dashboard for weather and news data, and a Twitter-like platform with ML-based recommendations.</li>
          <li>Leveraged cloud services and machine learning by utilizing Google Firebase for data storage, OpenAI for data summarization, and HuggingFace NLP models for a recommendation system, enhancing user experience and optimizing application functionalities.</li>
          <li>Gained expertise in Software Engineering and Data Structures while refining communication skills to effectively convey technical concepts, ensuring smooth collaboration and successful project delivery.</li>
        </ul>
        <h4>stack</h4>
        <p>
          <span class="xmb-tag">React</span>
          <span class="xmb-tag">Node.js</span>
          <span class="xmb-tag">Flask</span>
          <span class="xmb-tag">Firebase</span>
          <span class="xmb-tag">OpenAI</span>
          <span class="xmb-tag">HuggingFace</span>
        </p>
      `,
      },
    ],
  },
  {
  id: "skills",
  label: "skills",
  icon: ICONS.code,
  items: [
    {
      t: "Programming Languages",
      s: "Java · C/C++ · JavaScript/TypeScript · Python · SQL · PHP",
      icon: ICONS.code,
      body: `
        <h4>languages</h4>
        <p>
          <span class="xmb-tag">Java</span>
          <span class="xmb-tag">C/C++</span>
          <span class="xmb-tag">JavaScript</span>
          <span class="xmb-tag">TypeScript</span>
          <span class="xmb-tag">Python</span>
          <span class="xmb-tag">SQL</span>
          <span class="xmb-tag">PHP</span>
          <span class="xmb-tag">HTML/CSS</span>
        </p>
      `,
    },
    {
      t: "Frameworks & Tools",
      s: "React · Node.js · NestJS · FastAPI · Flask · Docker",
      icon: ICONS.layers,
      body: `
        <h4>frameworks & tools</h4>
        <p>
          <span class="xmb-tag">React</span>
          <span class="xmb-tag">Node.js</span>
          <span class="xmb-tag">NestJS</span>
          <span class="xmb-tag">FastAPI</span>
          <span class="xmb-tag">Flask</span>
          <span class="xmb-tag">Spring</span>
          <span class="xmb-tag">PySpark</span>
          <span class="xmb-tag">Pandas</span>
          <span class="xmb-tag">Docker</span>
        </p>
      `,
    },
    {
      t: "Databases & Platforms",
      s: "PostgreSQL · MySQL · MongoDB · GitHub Actions · Linux · Microsoft SQL Server Studio · Azure",
      icon: ICONS.chip,
      body: `
        <h4>databases & platforms</h4>
        <p>
          <span class="xmb-tag">PostgreSQL</span>
          <span class="xmb-tag">MySQL</span>
          <span class="xmb-tag">MongoDB</span>
          <span class="xmb-tag">Git</span>
          <span class="xmb-tag">GitHub</span>
          <span class="xmb-tag">Bitbucket</span>
          <span class="xmb-tag">GitHub Actions</span>
          <span class="xmb-tag">Linux</span>
          <span class="xmb-tag">macOS</span>
          <span class="xmb-tag">Windows</span>
        </p>
      `,
    },
    {
      t: "Engineering Practices",
      s: "REST APIs · CI/CD · OOP · Testing · Agile/Scrum",
      icon: ICONS.layers,
      body: `
        <h4>engineering practices</h4>
        <p>
          <span class="xmb-tag">REST API Design</span>
          <span class="xmb-tag">CI/CD</span>
          <span class="xmb-tag">OOP</span>
          <span class="xmb-tag">Unit Testing</span>
          <span class="xmb-tag">Integration Testing</span>
          <span class="xmb-tag">Agile/Scrum</span>
          <span class="xmb-tag">Technical Documentation</span>
        </p>
      `,
      },
    ],
  },
  {
    id: "hobbies",
    label: "hobbies",
    icon: ICONS.cam,
    items: [
      {
        t: "Beats & Production",
        s: "FL Studio ",
        icon: ICONS.music,
        body: "",
        tracks: [
          {
            title: "@tauhidz - sonyericSON 138bpm Cm",
            src: "/@tauhidz%20-%20sonyericSON%20138bpm%20Cm.wav",
          },
          {
            title: "@tauhidz, @butcheraidan - vortex 143bpm D#min",
            src: "/@tauhidz%2C%20@butcheraidan%20vortex%20143%20bpm%20d%23min%20.wav",
          },
          {
            title: "@tauhidz, @swosh - victory 147bpm",
            src: "/@tauhidz%2C%20@swosh%20-%20victory%20147%20bpm.wav",
          },
        ],
      },
      {
        t: "Photography",
        s: "Adobe Portfolio · tauhidur.myportfolio.com",
        icon: ICONS.cam,
        body: `
          <h4>photography portfolio</h4>
          <p>Visual storytelling through photography.
            &nbsp;<a href="https://tauhidur.myportfolio.com" target="_blank" rel="noopener">Open in new tab →</a>
          </p>
          <iframe
            src="https://tauhidur.myportfolio.com"
            title="Tauhidur Anjan Photography Portfolio"
            style="width:100%;height:500px;border:none;border-radius:6px;margin-top:8px;display:block;background:rgba(0,0,0,0.2);"
          ></iframe>
        `,
      },
    ],
  },
];
