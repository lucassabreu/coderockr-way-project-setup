import React from 'react';
import CoderockrWhite from './assets/images/hand-white.svg';
import './Footer.css'

const Footer = () => (
  <footer id="footer">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <CoderockrWhite alt="Coderockr Logo" title="You Rock!" className="white-logo pull-right" />
          <div className="text">
            <p>
              +55 47 3227-6359 &nbsp;&nbsp;&nbsp;
              contato@coderockr.com
            </p>
            <p className="copyright">© 2018 Coderockr. Todos os direitos reservados. &nbsp; Joinville - SC</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer