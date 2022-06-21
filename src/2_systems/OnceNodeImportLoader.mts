
// import DefaultIOR from "../Things/DefaultIOR.class.js";
// import { BaseNodeOnce } from "../../1_infrastructure/BaseNodeOnce.class.js";

export default class OnceNodeImportLoader {
  get class(): any {
    return OnceNodeImportLoader;
  }
  creationDate: Date;
  ENV = process.env;
  // mode = OnceMode.NODE_LOADER;
  // state = OnceState.DISCOVER_SUCCESS;
  private static instance: any;

  constructor() {
    this.creationDate = new Date();
  }

  static start() {
    if (!this.instance) {
      this.instance = new OnceNodeImportLoader();
    }
    return this.instance;
  }

  async start(): Promise<void> {
    console.log("ONCE STARTED AS NODE_LOADER");
    // return this;
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

    //HACK
    //@ts-ignore
    global.NODE_JS = true;
  }
}

const load = OnceNodeImportLoader.start().load;
const resolve = OnceNodeImportLoader.start().resolve;
const globalPreload = OnceNodeImportLoader.start().globalPreload;
export { load, resolve, globalPreload };

type resolveContext = {
  conditions: string[];
  importAssertions: object;
  parentURL: string | undefined;
};

type loadContext = {
  format: string | null | undefined;
  importAssertions: any;
};
