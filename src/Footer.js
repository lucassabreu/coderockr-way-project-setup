import React from 'react';
import whiteHand from './assets/images/hand-white.svg';

const Footer = () => (
  <footer id="footer">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <ul className="social">
            <li>
              <a href="https://www.facebook.com/coderockr" title="Curta a Coderockr no Facebook">
                <span className="icon-facebook"></span>
              </a>
            </li>
            <li>
              <a href="https://twitter.com/coderockr" title="Siga a Coderockr no Twitter" target="_blank">
                <span className="icon-twitter"></span>
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/user/coderockr" title="Acompahe a Coderockr no YouTube" target="_blank">
                <span className="icon-youtube"></span>
              </a>
            </li>
            <li>
              <a href="https://blog.coderockr.com" title="Leia sore a Coderockr no Medium" target="_blank">
                <span className="icon-medium"></span>
              </a>
            </li>
            <li>
              <a href="https://plus.google.com/+Coderockr" title="Acompahe a Coderockr no Google+" target="_blank">
                <span className="icon-google-plus"></span>
              </a>
            </li>
            <li>
              <a href="https://github.com/Coderockr" title="Acompahe a Coderockr no Github" target="_blank">
                <span className="icon-github"></span>
              </a>
            </li>
          </ul>
          <img src={whiteHand} alt="Coderockr Logo" title="You Rock!" className="pull-right" />
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