import React from 'react';
import '@animaliads/css-tokens/global-tokens.css';
import '@animaliads/animalia-brand/theme.css';
import '@animaliads/ani-radio';
import './style.css';

export default class App extends React.Component {
  componentDidMount() {
    const group = document.querySelectorAll('form ani-radio');
    const valueElement = document.querySelector('.value');

    group.forEach(radio => {
      radio.addEventListener('click', () => {
        group.forEach(otherRadio => {
          if (radio.getAttribute('value') !== otherRadio.getAttribute('value'))
            otherRadio.removeAttribute('checked');
        });

        valueElement.innerHTML = radio.getAttribute('value');
      });
    });
  }

  render() {
    return (
      <div>
        <form>
          <fieldset>
            <legend>Escolha uma plataforma:</legend>

            <ani-radio value="google">
              <span className="label">Google</span>
            </ani-radio>
            <ani-radio value="facebook">
              <span className="label">Facebook</span>
            </ani-radio>
            <ani-radio value="instagram">
              <span className="label">Instagram</span>
            </ani-radio>
            <ani-radio value="twitter">
              <span className="label">Twitter</span>
            </ani-radio>
          </fieldset>
        </form>
        <div>
          Valor escolhido: <span className="value" />
        </div>
      </div>
    );
  }
}
