export interface IDataResponse {
  data: {
    token: string;
    rahasia: number;
  }
  success: boolean;
  message: string;
  status: number;
  timestamp: number;
}
