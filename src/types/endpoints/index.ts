import { StorableTaskContract, StoredTaskContract } from "../models";

export type TaskEndpointIndexOptionsContract = {
  model_type: string;
  model_id: number;
  app_key?: string;
};

export type TaskEndpointStoreOptionsContract = {
  task: StorableTaskContract;
};

export type TaskEndpointUpdateOptionsContract = {
  task: StoredTaskContract;
};

export type TaskEndpointDestroyOptionsContract = {
  uuid: string;
};
