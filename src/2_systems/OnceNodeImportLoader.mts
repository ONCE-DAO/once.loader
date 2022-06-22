import Once, { OnceMode, OnceState, resolveContext, loadContext, OnceNodeImportLoader  } from "../../../../../../../../Scenarios/localhost/tla/EAM/Thinglish/dev/index.mjs";

export default class DefaultOnceNodeImportLoader implements Once, OnceNodeImportLoader {
  get class(): any {
    return DefaultOnceNodeImportLoader;
  }
  creationDate: Date;
  ENV = process.env;
  mode = OnceMode.NODE_LOADER;
  state = OnceState.DISCOVER_SUCCESS;
  private static instance: any;
  global: typeof globalThis = global;

  constructor() {
    this.creationDate = new Date();
  }


  static start() {
    if (!this.instance) {
      this.instance = new DefaultOnceNodeImportLoader();
    }
    return this.instance;
  }

  async start(): Promise<void> {
    console.log("ONCE WILL START AS NODE_LOADER");

    const asyncStartProcess = new Promise((resolve, reject) => {

      setTimeout(() => {
        console.log("e.g. Once is Installed")
      }, 1000);

      setTimeout(() => {
        console.log("or eamd is discovered")
      }, 2000);
      setTimeout(() => {
        console.log("or something else")
        resolve(undefined);
      }, 3000);
    });

    console.log(new Date())
    await asyncStartProcess
    console.log(new Date())

    console.log("ONCE STARTED AS NODE_LOADER");
  }

  async getEAMD() {
    return undefined;
  }

  async resolve(
    specifier: string,
    context: resolveContext,
    defaultResolve: Function
  ): Promise<{ url: string }> {
    // if (specifier.startsWith("ior:"))
    //   specifier = await DefaultIOR.load(specifier);
    return defaultResolve(specifier, context, defaultResolve);
  }

  async load(
    url: string,
    context: loadContext,
    defaultLoad: Function
  ): Promise<{
    format: "builtin" | "commonjs" | "json" | "module" | "wasm";
    source: string | ArrayBuffer | Int8Array;
  }> {
    // TODO hook it load via IOR
    console.log("LOAD", url);

    return defaultLoad(url, context, defaultLoad);
  }

  /**
 * This example has the application context send a message to the loader
 * and sends the message back to the application context
 * @param {{
     port: MessagePort,
   }} utilities Things that preload code might find useful
 * @returns {string} Code to run before application startup
 */
  globalPreload() {
    console.log("GLOBAL_PRELOAD")
    global.NODE_JS = true;
    return "console.log('GLOBAL RELOAD RETURN LOG');"
  }
}

