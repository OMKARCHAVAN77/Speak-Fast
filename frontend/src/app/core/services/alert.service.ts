import { ToastrService } from 'ngx-toastr';
// import { Injectable } from '@angular/core';
// import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

// @Injectable({
//   providedIn: 'root'
// })
// export class AlertService {

//   // ==============================
//   // Confirm Alert
//   // ==============================
//   confirm(
//     title: string,
//     text: string,
//     icon: SweetAlertIcon = 'warning',
//     confirmButtonText: string = 'Yes',
//     cancelButtonText: string = 'Cancel'
//   ): Promise<SweetAlertResult<any>> {

//     return Swal.fire({
//       title,
//       text,
//       icon,

//       showCancelButton: true,

//       confirmButtonText,
//       cancelButtonText,

//       reverseButtons: false,

//       heightAuto: false,
//       returnFocus: false,
//       scrollbarPadding: false,

//       buttonsStyling: false,

//       customClass: {
//         popup: 'custom-popup',
//         confirmButton: 'custom-confirm-btn',
//         cancelButton: 'custom-cancel-btn'
//       }
//     });

//   }

//   // ==============================
//   // Success Popup
//   // ==============================
//   success(title: string, text: string) {

//     return Swal.fire({
//       title,
//       text,
//       icon: 'success',

//       buttonsStyling: false,

//       customClass: {
//         popup: 'custom-popup',
//         confirmButton: 'custom-confirm-btn'
//       }
//     });

//   }

//   // ==============================
//   // Error Popup
//   // ==============================
//   error(title: string, text: string) {

//     return Swal.fire({
//       title,
//       text,
//       icon: 'error',

//       buttonsStyling: false,

//       customClass: {
//         popup: 'custom-popup',
//         confirmButton: 'custom-confirm-btn'
//       }
//     });

//   }

//   // ==============================
//   // Info Popup
//   // ==============================
//   info(title: string, text: string) {

//     return Swal.fire({
//       title,
//       text,
//       icon: 'info',

//       buttonsStyling: false,

//       customClass: {
//         popup: 'custom-popup',
//         confirmButton: 'custom-confirm-btn'
//       }
//     });

//   }

//   // ==============================
//   // Success Toast
//   // ==============================
//   toastSuccess(message: string) {

//     return Swal.fire({

//       toast: true,

//       position: 'bottom',

//       icon: 'success',

//       title: message,

//       showConfirmButton: false,

//       timer: 3000,

//       timerProgressBar: true,

//       customClass: {
//         popup: 'custom-toast'
//       }

//     });

//   }

// }


import { Injectable } from '@angular/core';
import Swal, {
  SweetAlertIcon,
  SweetAlertResult
} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private toster: ToastrService){}


  // ==============================
  // Confirm Alert
  // ==============================
  confirm(
    title: string,
    html: string,
    icon: SweetAlertIcon = 'warning',
    confirmButtonText: string = 'Yes',
    cancelButtonText: string = 'Cancel'
  ): Promise<SweetAlertResult<any>> {

    return Swal.fire({

      title: title,

      // IMPORTANT:
      // text ऐवजी html
      html: html,

      icon: icon,

      showCancelButton: true,

      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,

      reverseButtons: false,

      heightAuto: false,
      returnFocus: false,
      scrollbarPadding: false,

      buttonsStyling: false,

      customClass: {
        popup: 'custom-delete-popup',
        icon: 'custom-delete-icon',
        title: 'custom-delete-title',
        htmlContainer: 'custom-delete-text',
        actions: 'custom-delete-actions',
        confirmButton: 'custom-confirm-btn',
        cancelButton: 'custom-cancel-btn'
      }

    });

  }


  // ==============================
  // Success Popup
  // ==============================
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


  // ==============================
  // Error Popup
  // ==============================
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


  // ==============================
  // Info Popup
  // ==============================
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


  // ==============================
  // Success Toast
  // ==============================
  // toastSuccess(message: string) {

  //   return Swal.fire({

  //     toast: true,

  //     position: 'bottom',

  //     icon: 'success',

  //     title: message,

  //     showConfirmButton: false,

  //     timer: 3000,

  //     timerProgressBar: true,

  //     customClass: {
  //       popup: 'custom-toast'
  //     }

  //   });

  // }


  toasterSuccess(message: string){
    this.toster.success(message)
  }

  tosterUnsuccess(message: string){
    this.toster.error(message)
  }

  tosterInfo(message: string){
    this.toster.info(message)
  }

}
