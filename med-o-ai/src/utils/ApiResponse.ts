/* eslint-disable @typescript-eslint/no-explicit-any */
export class ApiResponse {
  status: number;
  message: string;
  data: any;
  success: boolean;

  constructor(status: number, message: string, data: any) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = status >= 200 && status < 300 ? true : false;
  }
}
