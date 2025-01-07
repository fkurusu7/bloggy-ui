import { useState } from 'react';

function MeBackground() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    {
      name: 'skills',
      content: ['html', 'css', 'javascript', 'typescript', 'sql', 'nosql', 'docker'],
    },
    {
      name: 'hobbies',
      content: ['biking', 'coding', 'calesthenics', 'chess', 'reading'],
    },
    {
      name: 'stack',
      content: [
        'MERN',
        'sass',
        'react.js',
        'node.js',
        'express.js',
        'mongodb',
        'postgresql',
        'devops',
      ],
    },
  ];

  return (
    <section className="me-background">
      <h1>Background</h1>
      <div className="me-background__tabs-buttons">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`me-background__tabs-button ${activeTab === index ? 'active' : ''}`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="me-background__tabs-content">
        {tabs[activeTab].content.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
    </section>
  );
}

export default MeBackground;
