import tsConfig from './tsconfig.json';
import tsconfigPaths from 'tsconfig-paths';

tsConfigPaths.register({
  baseUrl: './dist',
  paths: tsConfig.compilerOptions.paths,
});
