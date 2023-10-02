class AtomrigsModal extends HTMLElement {
  isOpen = false;
  onHideCallback = null

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  open(onHideCallback = null) {
    this.isOpen = true;
    this.render();

    this.onHideCallback = onHideCallback;
  }

  hide() {
    this.isOpen = false;
    if (this.onHideCallback) {
      this.onHideCallback();
    }
    this.render();
  }

  render() {
    const style = `
      .modal-background {
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        position: fixed;
        top: 0;
        left: 0;
        display: ${this.isOpen ? 'block' : 'none'};
        z-index: 9998;
      }
      
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        display: ${this.isOpen ? 'block' : 'none'};
        width: ${this.getAttribute('width') || '300px'};
        height: ${this.getAttribute('height') || '300px'};
        background-color: ${this.getAttribute('bgColor') || '#fff'};
        box-sizing: border-box;
        z-index: 9999;
      }

      .modal-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      .modal-header {
        width: 100%;
        min-height: 20px;
        background-color: white;
        box-sizing: border-box;
        display: flex;
        justify-content: end;
        padding: 0rem 0.5rem;
      }

      .modal-content {
        width: 100%;
        flex-grow: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .modal-footer {
        width: 100%;
        min-height: 20px;
        background-color: white;
        box-sizing: border-box;
      }
    `;
    // https://codeshack.io/pure-css3-modal-example/
    this.shadowRoot.innerHTML = `
      <style>
        ${style}
      </style>
      <div for="modal" class="modal-background"></div>
      <div class="modal">
        <div class="modal-container">
          <div class="modal-header">
            <span class="modal-close">X</span>
          </div>
          <div class="modal-content">
            <slot></slot>
          </div>
          <div class="modal-footer">
            &nbsp;
          </div>
        </div>
      </div>
    `;

    const hideFunc = () => {
      this.hide();
    };

    this.shadowRoot.querySelector('.modal-background')
    .addEventListener('click', hideFunc);

    const elm = this.shadowRoot.querySelector('.modal-header > span');
    elm.addEventListener('click', hideFunc);
  }

  connectedCallback() {
    this.render();
  }
};

customElements.define('atomrigs-modal', AtomrigsModal);