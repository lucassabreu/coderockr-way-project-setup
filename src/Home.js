import React from 'react';
import Footer from './Footer';
import Button from 'rmwc/Button';
import Icon from 'rmwc/Icon';
import { withRouter } from 'react-router-dom';

import logo from './assets/images/hand-yellow.svg'
import github from './assets/images/github.svg'
import gitlab from './assets/images/gitlab.svg'
import trello from './assets/images/trello.svg'
import './Home.css'

const base = window.location.href + 'callback'
const EXTERNAL_ROUTES = {
  GITHUB: 'https://github.com/login/oauth/authorize?client_id=0e8a63320fba47de145c&scope=repos&redirect_uri=' + base + '/github',
};

const Home = () => (
  <div className="Home">
    <header>
      <img src={logo} className="logo" />
      <h1 className="text">CODEROCKR WAY PROJECT SETUP</h1>
    </header>
    <div className="container">
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
          <li className="col-md-4">
            <a class="button" href={EXTERNAL_ROUTES.GITHUB}>
              <Icon children={github} />
              GitHub
            </a>
          </li>
          <li className="col-md-4">
            <Button disabled raised>
              <Icon children={gitlab} />
              GitLab
            </Button>
          </li>
          <li className="col-md-4">
            <Button disabled raised>
              <Icon children={trello} />
              Trello
            </Button>
          </li>
        </ul>
      </section>
      <section className="more-about">
        <h4>Wanna know more about?</h4>
        <p>Look this link: <a href="https://blog.coderockr.com/simplificando-o-setup-de-projetos-no-github-f29b76c83194">Simplificando o Setup de Projetos no GitHub</a>
        </p>
      </section>
    </div>
  </div>
)

export default withRouter(Home);