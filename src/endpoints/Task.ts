import { Client, Request } from "@henrotaym/api-client";
import { TryGettingApiResponse } from "@henrotaym/api-client/dist/responses";
import { TaskCredential } from "../credentials";
import {
  StoredTaskContract,
  TaskEndpointDestroyOptionsContract,
  TaskEndpointIndexOptionsContract,
  TaskEndpointStoreOptionsContract,
  TaskEndpointUpdateOptionsContract,
  ObjectPropType,
} from "../types";

class Task {
  private client = new Client(new TaskCredential());

  public async index(options: TaskEndpointIndexOptionsContract) {
    const request = new Request<{ data: Array<StoredTaskContract> }>()
      .setVerb("GET")
      .setUrl("/")
      .addQuery({ ...options, model_id: `${options.model_id}` });
    return this.parseResponse(await this.client.try(request));
  }

  public async store(options: TaskEndpointStoreOptionsContract) {
    const request = new Request<{ data: StoredTaskContract }>()
      .setVerb("POST")
      .setUrl("/")
      .addData(options);
    return this.parseResponse(await this.client.try(request));
  }

  public async update(options: TaskEndpointUpdateOptionsContract) {
    const request = new Request<{ data: StoredTaskContract }>()
      .setVerb("PUT")
      .setUrl(`${options.task.uuid}`)
      .addData(options);
    return this.parseResponse(await this.client.try(request));
  }

  public async destroy(options: TaskEndpointDestroyOptionsContract) {
    const request = new Request<{ data: StoredTaskContract }>()
      .setVerb("DELETE")
      .setUrl(`${options.uuid}`);
    return this.parseResponse(await this.client.try(request));
  }

  private parseResponse<
    R extends { data: any },
    V extends ObjectPropType<R, "data">
  >(response: TryGettingApiResponse<R>): V | null {
    if (response.failed()) {
      console.error(response.getException().context());
      return null;
    }

    return response.get()?.data || null;
  }
}

export default Task;
