const webglList = {
  ifland: {
    '1': {
      data: 'S01/S01.data',
      loader: 'S01/S01.loader.js',
      framework: 'S01/S01.framework.js',
      wasm: 'S01/S01.wasm'
    },
    '2': {
      data: 'S02/S02.data',
      loader: 'S02/S02.loader.js',
      framework: 'S02/S02.framework.js',
      wasm: 'S02/S02.wasm'
    },
    '3': {
      data: 'S03/S03.data',
      loader: 'S03/S03.loader.js',
      framework: 'S03/S03.framework.js',
      wasm: 'S03/S03.wasm'
    },
    '4': {
      data: 'S04/S04.data',
      loader: 'S04/S04.loader.js',
      framework: 'S04/S04.framework.js',
      wasm: 'S04/S04.wasm'
    },
    '5': {
      data: 'S05/S05.data',
      loader: 'S05/S05.loader.js',
      framework: 'S05/S05.framework.js',
      wasm: 'S05/S05.wasm'
    }
  },
  kansong: {
    '1': {
      data: 'K01/K01.data',
      loader: 'K01/K01.loader.js',
      framework: 'K01/K01.framework.js',
      wasm: 'K01/K01.wasm'
    },
    '2': {
      data: 'K02/K02.data',
      loader: 'K02/K02.loader.js',
      framework: 'K02/K02.framework.js',
      wasm: 'K02/K02.wasm'
    },
    '3': {
      data: 'K03/K03.data',
      loader: 'K03/K03.loader.js',
      framework: 'K03/K03.framework.js',
      wasm: 'K03/K03.wasm'
    },
  },
  pinzle: {
    '1': {
      data: 'P01/P01.data',
      loader: 'P01/P01.loader.js',
      framework: 'P01/P01.framework.js',
      wasm: 'P01/P01.wasm'
    },
    '2': {
      data: 'P02/P02.data',
      loader: 'P02/P02.loader.js',
      framework: 'P02/P02.framework.js',
      wasm: 'P02/P02.wasm'
    },
    '3': {
      data: 'P03/P03.data',
      loader: 'P03/P03.loader.js',
      framework: 'P03/P03.framework.js',
      wasm: 'P03/P03.wasm'
    },
    '4': {
      data: 'P04/P04.data',
      loader: 'P04/P04.loader.js',
      framework: 'P04/P04.framework.js',
      wasm: 'P04/P04.wasm'
    },
    '5': {
      data: 'P05/P05.data',
      loader: 'P05/P05.loader.js',
      framework: 'P05/P05.framework.js',
      wasm: 'P05/P05.wasm'
    },
    '6': {
      data: 'P06/P06.data',
      loader: 'P06/P06.loader.js',
      framework: 'P06/P06.framework.js',
      wasm: 'P06/P06.wasm'
    }
  },
};
class AtomrigsWebGLPlayer extends AtomrigsElement {
  status = 'idle';
  elmId = null
  unityInstance = null;
  canvas = null;

  constructor() {
    super();
  }

  render() {
    const id = this.elmId;
    const style = `
      #${id}-unity-canvas {
        width: 100%;
        height: 100%;
      }

      #${id}-unity-loading-bar {
        width: 100%;
      }
    `;

    this.innerHTML = `
      <style>
        ${style}
      </style>
      <div class="webgl-container" style="position: relative;">
        <div id="${id}-unity-loading-spinner" style="position: absolute; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; text-align: center; color: white;">
          <span>Loading.....</span>
        </div>
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
    if (this.canvas) {
      const context = this.canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (context.reset) {
          context.reset();
        }
      }
    }

    if (this.unityInstance) {
      this.unityInstance.Quit(function() {
          console.log("WebGL Player is cleared.");
      });
      this.unityInstance = null;
    }
    this.removeLoadedScripts();
  }

  removeLoadedScripts() {
    if (this.config) {
      const loaderScript = this.getLoaderScriptElement();
      if (loaderScript) {
        // console.log(`${this.config.loaderUrl} 제거중`);
        document.body.removeChild(loaderScript);
      }
      const frameworkScript = this.getFrameworkScriptElement();
      if (frameworkScript) {
        // console.log(`${this.config.frameworkUrl} 제거중`);
        document.body.removeChild(frameworkScript);
      }
    }
  }

  getConfig({ collection, itemNo }) {
    // https://docs.unity3d.com/Manual/webgl-building.html
    // https://docs.unity3d.com/Manual/webgl-templates.html

    const prefix = `../webgl/`;
    const config = {
      loaderUrl: `${prefix}${webglList[collection][itemNo].loader}`,
      dataUrl: `${prefix}${webglList[collection][itemNo].data}`,
      frameworkUrl: `${prefix}${webglList[collection][itemNo].framework}`,
      codeUrl: `${prefix}${webglList[collection][itemNo].wasm}`,
      // loaderUrl: `${prefix}/loader.js`,
      // frameworkUrl: `${prefix}/framework.js`,
      // codeUrl: `${prefix}/webgl.wasm`,
      streamingAssetsUrl: "StreamingAssets",
      companyName: "Atomrigs Lab Inc.",
      productName: "Interverse",
      productVersion: "1.0",
      showBanner: false
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

  startView(collection, itemNo) {
    this.status = 'loading';
    this.render();

    this.config = this.getConfig({ collection, itemNo });

    if (this.config === null) {
      return false;
    }

    this.removeLoadedScripts();

    const scriptElm = window.document.createElement("script");
    scriptElm.type = "text/javascript";
    scriptElm.src = this.config.loaderUrl;
    scriptElm.async = true;

    window.document.body.appendChild(scriptElm);

    const loadingBar = document.querySelector(`#${this.elmId}-unity-loading-spinner`);

    scriptElm.addEventListener('load', () => {
      this.status = 'loaded';
      console.log('The loader script is loaded. (Probably along with the framework script)');

      console.log({canvas: this.canvas})
      createUnityInstance(this.canvas, this.config, (progress) => {
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

    const container = document.querySelector(`#${this.elmId}-unity-container`);
    const progressBarFull = document.querySelector("#unity-progress-bar-full");
    // var fullscreenButton = document.querySelector("#unity-fullscreen-button");
    // const warningBanner = document.querySelector("#unity-warning");


    // if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    //   // Mobile device style: fill the whole browser client area with the game canvas:

    //   var meta = document.createElement('meta');
    //   meta.name = 'viewport';
    //   meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    //   document.getElementsByTagName('head')[0].appendChild(meta);
    //   container.className = "unity-mobile";
    //   canvas.className = "unity-mobile";

    //   // unityShowBanner('WebGL builds are not supported on mobile devices.');
    // } else {
    //   // Desktop style: Render the game canvas in a window that can be maximized to fullscreen:
    // }

    loadingBar.style.display = "flex";

    return true;
  }

  connectedCallback() {
    this.elmId = this.getAttribute('id');
    if (!this.elmId) {
      throw new Error('Must provide id');
    }

    super.connectedCallback()
    .then(() => {
      this.render();
      this.canvas = window.document.querySelector(`#${this.elmId}-unity-canvas`);
    })
  }
};

customElements.define('atomrigs-webgl-player', AtomrigsWebGLPlayer);