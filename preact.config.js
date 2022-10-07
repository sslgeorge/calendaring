import path from 'path';

export default (config, env, helpers, options) => {
  config.resolve.alias = {
    '@src': path.resolve(__dirname, 'src'),
    ...config.resolve.alias,
  };
};
