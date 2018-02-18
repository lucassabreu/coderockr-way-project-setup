import React from 'react';
import { withRouter } from 'react-router-dom';

import githubLogo from './assets/images/github.svg'
import gitlabLogo from './assets/images/gitlab.svg'
import trelloLogo from './assets/images/trello.svg'
import './Home.css'

const callbackUrl = (setupable) => `${window.location.href}${setupable}/callback`
const SETUPABLE = [
  {
    name: "GitHub",
    logo: githubLogo,
    enabled: true,
    url: 'https://github.com/login/oauth/authorize?client_id=0e8a63320fba47de145c&scope=repos&redirect_uri=' + callbackUrl('github'),
  },
  {
    name: "GitLab",
    logo: gitlabLogo,
    enabled: false,
    url: null,
  },
  {
    name: "Trello",
    logo: trelloLogo,
    enabled: false,
    url: null,
  },
];

const Home = () => (
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
        {SETUPABLE.map(({ name, logo: Logo, url, enabled }) => (
          <li key={name} className="col-md-4">
            <a className={`btn btn-primary ${enabled ? null : 'disabled'}`} href={url}
              alt={enabled ? '' : `${name} will be supported soon`}>
              <Logo className="icon" />
              {name}
            </a>
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

export default withRouter(Home);