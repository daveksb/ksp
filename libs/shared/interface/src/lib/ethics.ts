import { Route } from '@angular/router';
import { MenuConfig } from '@ksp/shared/menu';

export type EthicsMode = 'accusation' | 'investigation' | 'inquiry' | 'publish';

export interface CustomRouteData {
  menuConfig: MenuConfig[];
  headerLabel: string;
  headerDetail?: string;
  ethicsMode?: EthicsMode;
}

export interface CustomRoute extends Route {
  data?: CustomRouteData;
}
