class AtomrigsModal extends AtomrigsElement {
  isOpen = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  open() {
    this.isOpen = true;
    this.render();
  }

  hide() {
    this.isOpen = false;
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

      .modal-header {
        width: 100%;
        background-color: transparent;
        box-sizing: border-box;
        height: 50px;
      }
    `;
    // https://codeshack.io/pure-css3-modal-example/
    this.shadowRoot.innerHTML = `
      <style>
        ${style}
      </style>
      <div for="modal" class="modal-background"></div>
      <div class="modal">
        <div class="modal-header">
          <span class="modal-close">X</span>
        </div>
        <slot></slot>
      </div>
    `;

    const hideFunc = () => {
      this.isOpen = false;
      this.render();
    };

    this.shadowRoot.querySelector('.modal-background')
    .addEventListener('click', hideFunc);

    const elm = this.shadowRoot.querySelector('.modal-header > span');
    elm.addEventListener('click', hideFunc);
  }

  connectedCallback() {
    super.connectedCallback()
    .then(() => {
      this.render();
    })
  }
};

customElements.define('atomrigs-modal', AtomrigsModal);