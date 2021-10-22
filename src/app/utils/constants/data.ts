import {ToastStyleModel} from "ecapture-ng-ui/lib/modules/toast/model/toast.model";

export const toastDataStyle: ToastStyleModel = {
  alert: {
    error: 'bg-container-alert-error',
    info: 'bg-container-alert-info',
    success: 'bg-container-alert-success',
    warning: 'bg-container-alert-warning'
  },
  container: {
    color: 'bg-container-gray-3',
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
    color: 'text-outline-gray-4',
    size: '',
    font: ''
  }
}
