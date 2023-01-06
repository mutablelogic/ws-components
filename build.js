const { build } = require("esbuild");
const { dependencies, peerDependencies } = require('./package.json')

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  loader: { 
    ".svg": "file", 
    ".png": "file", 
    ".jpg": "file", 
    ".woff": "file",
    ".woff2": "file",
    ".ttf": "file",
    ".otf": "file",
    ".html": "text",
  },
  external: Object.keys(dependencies || {}).concat(Object.keys(peerDependencies || {})),
};

build({
  ...sharedConfig,
  platform: 'node', // for CJS
  outfile: "dist/index.js",
  sourcemap: true,
});

build({
  ...sharedConfig,
  outfile: "dist/index.esm.js",
  platform: 'neutral', // for ESM
  format: "esm",
  sourcemap: true,
});

