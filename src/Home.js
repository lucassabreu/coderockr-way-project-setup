import React from 'react';
import { withRouter } from 'react-router-dom';

import githubLogo from './assets/images/github.svg'
import gitlabLogo from './assets/images/gitlab.svg'
import trelloLogo from './assets/images/trello.svg'
import Authenticator from 'netlify-auth-providers';
import { UncontrolledTooltip } from 'reactstrap';
import './Home.css'

const nullCallback = (event) => event.preventDefault();
const auth = new Authenticator({ site_id: "cwps.lucassabreu.net.br" });

const Home = ({ history }) => {
  const origins = [
    {
      name: "GitHub",
      logo: githubLogo,
      enabled: true,
      callback: (event) => {
        auth.authenticate({ provider: "github", scope: ["user", 'repo'] }, (err, data) => {
          if (err) {
            console.error(err);
            return
          }
          sessionStorage.setItem('github-token', data.token);
          history.push('/github');
        })
      }
    },
    {
      name: "GitLab",
      logo: gitlabLogo,
      enabled: false,
      callback: nullCallback,
    },
    {
      name: "Trello",
      logo: trelloLogo,
      enabled: false,
      callback: nullCallback,
    },
  ];

  return (
    <div className="Home">
      <section className="description">
        <p>
          This web client helps to setup a project at GitHub, GitLab or Trello to use the
          Coderockr Way's labels, making easier to bootstrap the basic configuration at
          your project.
      </p>
      </section>
      <section className="project-handlers">
        <h2>Where is your project?</h2>
        <ul className="row project-handlers-buttons justify-content-md-center">
          {origins.map(({ name, logo: Logo, callback, enabled }) => (
            <li key={name} className="col-md-4">
              <button id={`btn_origin_${name}`} className={`btn btn-primary ${enabled ? null : 'disabled'}`}
                onClick={(event) => callback(event)}
              >
                <Logo className="icon" />
                {name}
              </button>
              {enabled ? null :
                <UncontrolledTooltip placement="bottom" target={`btn_origin_${name}`} >
                  {name} will be supported soon
                </UncontrolledTooltip>
              }
            </li>
          ))}
        </ul>
      </section>
      <section className="more-about">
        <h4>Wanna know more about?</h4>
        <p>Look this link: <a href="https://blog.coderockr.com/simplificando-o-setup-de-projetos-no-github-f29b76c83194">Simplificando o Setup de Projetos no GitHub</a>
        </p>
      </section>
    </div>
  )
}

export default withRouter(Home);