import React, { Component } from 'react';
import './Landing.scss';
import { Link } from 'react-router-dom';

const containers = [
  {
    title: 'Building Blocks',
    description: 'Tutorials based around building a project that can be continued locally after the web tutorial is complete.',
    to: '/blocks',
  },
  {
    title: 'Lessons',
    description: 'Self-Contained tutorials that walk someone through an important concept through a series of guided code challenges, videos and walkthroughs.',
    to: '/lessons',
  },
  {
    title: 'Challenges',
    description: 'Code Tests designed to extend upon knowledge that is taught in lessons and building blocks. Unlike lessons, necessary information to complete it may need to be looked up.',
    to: '/challenges',
  }
]

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        {containers.map(({ title, description, to }) => (
          <div className="container">
            <h2>{title}</h2>
            <p>{description}</p>
            <Link to={to}>
              <div className="btn btn-primary">
                BUIDL
              </div>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default Landing;
