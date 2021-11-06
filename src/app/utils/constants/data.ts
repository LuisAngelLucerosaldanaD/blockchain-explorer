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


export const styleInpSearch = {
  alert: {
    info: {
      font: 'font-rubik',
      color: 'text-outline-alert-info',
      label: '',
      size: 'text-base'
    },
    error: {
      font: 'font-rubik',
      color: 'text-outline-alert-error',
      label: '',
      size: 'text-base'
    },
    success: {
      font: 'font-rubik',
      color: 'text-outline-alert-success',
      label: '',
      size: 'text-base'
    },
    warning: {
      font: 'font-rubik',
      color: 'text-outline-alert-warning',
      label: '',
      size: 'text-base'
    },
  },
  headerLabel: {
    label: '',
    color: 'text-white',
    font: 'font-rubik',
    size: 'text-base'
  },
  placeholder: {
    label: 'Search by id block',
    color: 'text-outline-gray-1',
    font: 'font-rubik',
    size: 'text-base'
  },
  error: {
    error: false,
    color: '',
    text: {
      label: '',
      color: '',
      font: 'font-rubik',
      size: ''
    }
  },
  container: {
    background: 'bg-container-gray-1',
    border: {
      color: 'border-container-gray-1',
      size: 'border-4',
      round: 'rounded-lg',
      style: 'border-solid',
      hover: 'border-container-gray-3'
    }
  }
}
