// Minimal Node.js type stubs to satisfy TypeScript when full @types/node
// definitions are unavailable in the build environment. These stubs provide
// the APIs that Vite's type declarations depend on without enforcing any
// specific typing constraints.
declare var console: Record<string, unknown>;

type Buffer = any;
declare const Buffer: Buffer;

declare namespace NodeJS {
  interface EventEmitter {
    on: (...args: any[]) => this;
    once: (...args: any[]) => this;
    off: (...args: any[]) => this;
    emit: (...args: any[]) => boolean;
  }
}

declare module 'node:fs' {
  const fs: any;
  export = fs;
}

declare module 'node:http' {
  const http: any;
  export = http;
}

declare module 'node:https' {
  const https: any;
  export = https;
}

declare module 'node:http2' {
  const http2: any;
  export = http2;
}

declare module 'node:net' {
  const net: any;
  export = net;
}

declare module 'node:tls' {
  const tls: any;
  export = tls;
}

declare module 'node:events' {
  const events: any;
  export = events;
  export type EventEmitter = NodeJS.EventEmitter;
}

declare module 'node:url' {
  const url: any;
  export = url;
  export const URL: any;
}

declare module 'node:stream' {
  const stream: any;
  export = stream;
  export type Duplex = any;
  export type DuplexOptions = any;
}

declare module 'node:zlib' {
  const zlib: any;
  export = zlib;
}

declare module 'node:buffer' {
  const buffer: any;
  export = buffer;
}

declare const process: any;

declare interface SymbolConstructor {
  readonly asyncDispose: unique symbol;
}
