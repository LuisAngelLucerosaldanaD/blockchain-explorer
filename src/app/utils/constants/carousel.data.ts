import {ICarouselItem} from "@app/modules/home/models/home.model";
import {MenuModel} from "@app/models/ui.model";

export const CAROUSEL_DATA_ITEMS: ICarouselItem[] = [
  {
    id: 1,
    title: {
      first: 'TITULO',
      second: 'Principal'
    },
    subtitle: 'Esto es una gran descripción',
    link: '/',
    image: ''
  },
  {
    id: 2,
    title: {
      first: 'TITULO',
      second: 'Segundo'
    },
    subtitle: 'Esto es una gran descripción',
    link: '/',
    image: ''
  },
  {
    id: 3,
    title: {
      first: 'TITULO',
      second: 'Tercero'
    },
    subtitle: 'Esto es una gran descripción',
    link: '/',
    image: ''
  },
  {
    id: 4,
    title: {
      first: 'TITULO',
      second: 'Cuarto'
    },
    subtitle: 'Esto es una gran descripción',
    link: '/',
    image: ''
  },
  {
    id: 5,
    title: {
      first: 'TITULO',
      second: 'Quinto'
    },
    subtitle: 'Esto es una gran descripción',
    link: '/',
    image: ''
  }
];

export const MENU_DATA_ITEMS: MenuModel[] = [
  {
    label: 'Explorer',
    status: true,
    route: 'explorer'
  },
  {
    label: 'Contact',
    status: false,
    route: 'contact'
  },
  {
    label: 'Sign In',
    status: false,
    route: 'auth/login'
  }
];

export const dataCredentialViewer = [];
