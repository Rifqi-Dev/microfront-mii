import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'post',
  exposes: {
    './Routes': 'post/src/app/remote-entry/entry.routes.ts',
  },
};

export default config;
