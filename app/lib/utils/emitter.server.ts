import { EventEmitter } from "events";

let emitter: EventEmitter;
declare global {
  var __emitter__: EventEmitter | undefined;
}

emitter = global.__emitter__ || new EventEmitter();

export { emitter };
