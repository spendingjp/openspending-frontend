import { Plugin } from '@nuxt/types';
import { initializeAxios } from '~/plugins/Axios';

export const accessor: Plugin = ({ $axios }): void => {
  initializeAxios($axios);
};

export default accessor;