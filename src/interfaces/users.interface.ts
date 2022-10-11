export interface User {
  userId: number;
  email: string;
  password: string;
  authState: boolean;
  authKey: string;
  groupId: number;
}
