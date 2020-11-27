const tsConfig = require('./tsconfig.json');
const tsconfigPaths = require('tsconfig-paths');

const cleanup = tsconfigPaths.register({
  baseUrl: './',
  paths: tsConfig.compilerOptions.paths,
});

cleanup();
