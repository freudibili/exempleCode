export const enum SNACK_BAR_ALERT {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export type SnackBarAlertType = {
  type: SNACK_BAR_ALERT;
  message: string;
};
