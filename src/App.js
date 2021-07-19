import React from 'react';
import '@animaliads/css-tokens/global-tokens.css';
import '@animaliads/animalia-brand/theme.css';
import '@animaliads/ani-radio';
import './style.css';

var KEYCODE = {
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  UP: 38
};

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
      radio.addEventListener('keydown', this.keyDownRadioGroup.bind(this));
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

  keyDownRadioGroup(event) {
    var type = event.type;
    var next = false;

    if (type === 'keydown') {
      var node = event.currentTarget;

      switch (event.keyCode) {
        case KEYCODE.DOWN:
        case KEYCODE.RIGHT:
          var next = this.nextRadioButton(node);
          if (!next) next = this.firstRadioButton(node); //if node is the last node, node cycles to first.
          break;

        case KEYCODE.UP:
        case KEYCODE.LEFT:
          next = this.previousRadioButton(node);
          if (!next) next = this.lastRadioButton(node); //if node is the last node, node cycles to first.
          break;

        case KEYCODE.SPACE:
          next = node;
          break;
      }

      if (next) {
        var radioButton = this.firstRadioButton(node);

        while (radioButton) {
          console.log('atual:', radioButton);
          this.setRadioButton(radioButton, 'false');
          radioButton = this.nextRadioButton(radioButton);
        }

        console.log('proximo:', next);
        this.setRadioButton(next, 'true');

        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  firstRadioButton(node) {
    var first = node.parentNode.firstChild;

    while (first) {
      if (first.nodeType === Node.ELEMENT_NODE) {
        if (first.tagName === 'ani-radio') return first;
      }
      first = first.nextSibling;
    }

    return null;
  }

  lastRadioButton(node) {
    var last = node.parentNode.lastChild;

    while (last) {
      if (last.nodeType === Node.ELEMENT_NODE) {
        if (last.tagName === 'ani-radio') return last;
      }
      last = last.previousSibling;
    }

    return last;
  }

  nextRadioButton(node) {
    var next = node.nextSibling;

    while (next) {
      if (next.nodeType === Node.ELEMENT_NODE) {
        if (next.tagName === 'ani-radio') return next;
      }
      next = next.nextSibling;
    }

    return null;
  }

  previousRadioButton(node) {
    var prev = node.previousSibling;

    while (prev) {
      if (prev.nodeType === Node.ELEMENT_NODE) {
        if (prev.tagName === 'ani-radio') return prev;
      }
      prev = prev.previousSibling;
    }

    return null;
  }

  setRadioButton(node, state) {
    console.log('node:', node);
    if (state == 'true') {
      node.setAttribute('checked', 'true');
      node.tabIndex = 0;
      node.focus();
    } else {
      node.setAttribute('checked', 'false');
      node.tabIndex = -1;
    }
  }
}
