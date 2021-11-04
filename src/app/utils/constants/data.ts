import {ToastStyleModel} from "ecapture-ng-ui/lib/modules/toast/model/toast.model";

export const toastDataStyle: ToastStyleModel = {
  alert: {
    error: 'bg-container-alert-error',
    info: 'bg-container-alert-info',
    success: 'bg-container-alert-success',
    warning: 'bg-container-alert-warning'
  },
  container: {
    color: 'bg-outline-gray-3',
    border: {
      round: 'rounded',
      color: 'border-outline-gray-4',
      size: 'border',
      style: 'border-solid'
    }
  },
  icon: {
    close: {
      color: 'text-black'
    },
    alert: {
      color: 'text-white'
    }
  },
  text: {
    color: 'text-black',
    size: '',
    font: ''
  }
}

export const phoneCode = [
  {
    label: '+51 Peru',
    value: '+51'
  },
  {
    label: '+57 Colombia',
    value: '+57'
  },
];

export const typeIdentification = [
  {
    label: 'Cedula de Ciudadania',
    value: '1'
  }
];
