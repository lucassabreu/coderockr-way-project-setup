import React from 'react';
import CoderockrWhite from './assets/images/hand-white.svg';
import './Footer.css'

const Footer = () => (
  <footer id="footer">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <CoderockrWhite alt="Coderockr Logo" title="You Rock!" className="white-logo" />
          <div className="text">
            <p>
              <a href="phone:+55 47 3227-6359">+55 47 3227-6359</a> &nbsp;&nbsp;&nbsp;
              <a href="mail:contato@coderockr.com">contato@coderockr.com</a>
            </p>
            <p className="copyright">© 2018 Coderockr. Todos os direitos reservados. &nbsp; Joinville - SC</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer