import { getCookie } from '@ksp/shared/utility';

export const environment = {
  production: false,
  apiUrl: 'https://kspapi.oceanicnetwork.net/ksp',
  token: getCookie('schUserToken'),
};
