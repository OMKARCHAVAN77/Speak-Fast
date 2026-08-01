import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult, SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  confirm(
    title: string,
    text: string,
    icon: SweetAlertIcon = 'warning',
    confirmButtonText: string = 'Yes',
    cancelButtonText: string = 'Cancel'
  ): Promise<SweetAlertResult<any>> {

    return Swal.fire({
      title,
      text,
      icon,

      showCancelButton: true,

      confirmButtonText,
      cancelButtonText,

      reverseButtons: true,

      buttonsStyling: false,

      customClass: {
        popup: 'custom-popup',
        confirmButton: 'custom-confirm-btn',
        cancelButton: 'custom-cancel-btn'
      }
    });

  }

  success(title: string, text: string) {

    return Swal.fire({
      title,
      text,
      icon: 'success',

      buttonsStyling: false,

      customClass: {
        popup: 'custom-popup',
        confirmButton: 'custom-confirm-btn'
      }
    });

  }

  error(title: string, text: string) {

    return Swal.fire({
      title,
      text,
      icon: 'error',

      buttonsStyling: false,

      customClass: {
        popup: 'custom-popup',
        confirmButton: 'custom-confirm-btn'
      }
    });

  }

  info(title: string, text: string) {

    return Swal.fire({
      title,
      text,
      icon: 'info',

      buttonsStyling: false,

      customClass: {
        popup: 'custom-popup',
        confirmButton: 'custom-confirm-btn'
      }
    });

  }

}