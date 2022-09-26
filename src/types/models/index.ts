export type StorableTaskContract = {
  title: string;
  is_done: boolean;
  done_at?: string;
  due_date?: string;
  is_having_due_date_time: boolean;
  users: Array<UserContract>;
  app_key?: string;
  model_id: number;
  model_type: string;
  options: { [key: string]: any };
};

export interface UserContract {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

export type StoredTaskContract = StorableTaskContract & {
  uuid: string;
  id: number;
  trustup_io_messaging: MessagingIoOptionsContract;
};

export type MessagingIoOptionsContract = {
  "app-key": string;
  "model-id": string;
  "model-type": string;
  "user-id"?: number;
  api: string;
};
