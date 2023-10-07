const webglList = {
  ifland: {
    '0': '../webgl/webgl.data',
    '1': '../webgl/webgl.data',
    '2': '../webgl/webgl.data',
    '3': '../webgl/webgl.data',
    '4': '../webgl/webgl.data',
  },
  kansong: {
    '0': '../webgl/webgl.data',
    '1': '../webgl/webgl.data',
    '2': '../webgl/webgl.data',
  },
  pinzle: {
    '0': '../webgl/webgl.data',
    '1': '../webgl/webgl.data',
    '2': '../webgl/webgl.data',
    '3': '../webgl/webgl.data',
    '4': '../webgl/webgl.data',
    '5': '../webgl/webgl.data',
  }
};
class AtomrigsWebGLPlayer extends AtomrigsElement {
  status = 'idle';
  config = null;

  constructor() {
    super();
  }

  render() {
    const id = this.getAttribute('id');
    const style = `
      #${id}-unity-canvas {
        width: 100%;
        height: 100%;
      }
    `;

    // TODO:
    // const width = this.getAttribute('width');
    // const height = this.getAttribute('height');
    // const attributes = `width=960 height=600`;

    this.innerHTML = `
      <style>
        ${style}
      </style>
      <div>
        <canvas id="${id}-unity-canvas"></canvas>
        <div id="${id}-unity-loading-bar">
          <div id="${id}-unity-logo"></div>
          <div id="${id}-unity-progress-bar-empty">
            <div id="${id}-unity-progress-bar-full"></div>
          </div>
        </div>
      </div>
    `;
  }

  close() {
    console.log('닫습니다.');
    this.removeLoadedScripts();
    // this.innerHTML = '';
  }

  removeLoadedScripts() {
    if (this.config) {
      const loaderScript = this.getLoaderScriptElement();
      if (loaderScript) {
        console.log(`${this.config.loaderUrl} 제거중`);
        document.body.removeChild(loaderScript);
      }
      const frameworkScript = this.getFrameworkScriptElement();
      if (frameworkScript) {
        console.log(`${this.config.frameworkUrl} 제거중`);
        document.body.removeChild(frameworkScript);
      }
    }
  }

  // index는 0부터 시작
  getConfig(dataUrl) {
    // https://docs.unity3d.com/Manual/webgl-building.html
    // https://docs.unity3d.com/Manual/webgl-templates.html

    const prefix = `/../webgl/webgl`;
    const config = {
      loaderUrl: `${prefix}.loader.js`,
      dataUrl,
      frameworkUrl: `${prefix}.framework.js`,
      codeUrl: `${prefix}.wasm`,
      streamingAssetsUrl: "StreamingAssets",
      companyName: "Atomrigs Lab Inc.",
      productName: "Interverse",
      productVersion: "1.0",
      showBanner: false
      // showBanner: unityShowBanner,
    };
    console.log({config});

    // By default Unity keeps WebGL canvas render target size matched with
    // the DOM size of the canvas element (scaled by window.devicePixelRatio)
    // Set this to false if you want to decouple this synchronization from
    // happening inside the engine, and you would instead like to size up
    // the canvas DOM size and WebGL render target sizes yourself.
    config.matchWebGLToCanvasSize = true;

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      // Mobile device style: fill the whole browser client area with the game canvas:

      // To lower canvas resolution on mobile devices to gain some
      // performance, uncomment the following line:
      config.devicePixelRatio = 1;
    }

    return config;
  }

  getLoaderScriptElement() {
    if (this.config === null) {
      return null;
    }

    // Ref: https://github.com/jeffreylanters/react-unity-webgl/blob/main/module/source/hooks/use-unity-loader.ts
    return window.document.querySelector(
      `script[src="${this.config.loaderUrl}"]`
    );
  }

  getFrameworkScriptElement() {
    if (this.config === null) {
      return null;
    }

    return window.document.querySelector(
      `script[src="${this.config.frameworkUrl}"]`
    );
  }

  startView(collection, nftIndex) {
    this.render();

    this.config = this.getConfig(webglList[collection][nftIndex]);

    if (this.config === null) {
      return false;
    }

    this.removeLoadedScripts();

    const scriptElm = window.document.createElement("script");
    scriptElm.type = "text/javascript";
    scriptElm.src = this.config.loaderUrl;
    scriptElm.async = true;

    window.document.body.appendChild(scriptElm);

    scriptElm.addEventListener('load', () => {
      this.status = 'loaded';
      console.log('The loader script is loaded. (Probably along with the framework script)');

      createUnityInstance(canvas, this.config, (progress) => {
        // progressBarFull.style.width = 100 * progress + "%";
      }).then((unityInstance) => {
        console.log('Unity instance is created')
        loadingBar.style.display = "none";
        // fullscreenButton.onclick = () => {
        //   unityInstance.SetFullscreen(1);
        // };
      }).catch((message) => {
        alert(message);
      });
    });

    scriptElm.addEventListener("error", () => {
      this.status = 'error';
    });

    const id = this.getAttribute('id');
    const container = document.querySelector(`#${id}-unity-container`);
    const canvas = document.querySelector(`#${id}-unity-canvas`);
    const loadingBar = document.querySelector(`#${id}-unity-loading-bar`);
    // var progressBarFull = document.querySelector("#unity-progress-bar-full");
    // var fullscreenButton = document.querySelector("#unity-fullscreen-button");
    // const warningBanner = document.querySelector("#unity-warning");


    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      // Mobile device style: fill the whole browser client area with the game canvas:

      var meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
      document.getElementsByTagName('head')[0].appendChild(meta);
      container.className = "unity-mobile";
      canvas.className = "unity-mobile";

      // unityShowBanner('WebGL builds are not supported on mobile devices.');
    } else {
      // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:
    }

    loadingBar.style.display = "block";

    return true;
  }

  connectedCallback() {
    super.connectedCallback()
    .then(() => {
      this.render();
    })
  }
};

customElements.define('atomrigs-webgl-player', AtomrigsWebGLPlayer);