import { Client, Request } from "@henrotaym/api-client";
import { TryGettingApiResponse } from "@henrotaym/api-client/dist/responses";
import { TaskCredential } from "../credentials";
import {
  StoredTaskContract,
  TaskEndpointDestroyOptionsContract,
  TaskEndpointIndexOptionsContract,
  TaskEndpointStoreOptionsContract,
  TaskEndpointUpdateOptionsContract,
} from "../types";

class Task {
  private client = new Client(new TaskCredential());

  public async index(options: TaskEndpointIndexOptionsContract) {
    const request = new Request<Array<StoredTaskContract>>()
      .setVerb("GET")
      .setUrl("tasks")
      .addQuery({ ...options, model_id: `${options.model_id}` });
    return this.parseResponse(await this.client.try(request));
  }

  public async store(options: TaskEndpointStoreOptionsContract) {
    const request = new Request<StoredTaskContract>()
      .setVerb("POST")
      .setUrl("tasks")
      .addData(options);
    return this.parseResponse(await this.client.try(request));
  }

  public async update(options: TaskEndpointUpdateOptionsContract) {
    const request = new Request<StoredTaskContract>()
      .setVerb("PUT")
      .setUrl(`tasks/${options.task.uuid}`)
      .addData(options);
    this.client.try(request);
    return this.parseResponse(await this.client.try(request));
  }

  public async destroy(options: TaskEndpointDestroyOptionsContract) {
    const request = new Request<StoredTaskContract>()
      .setVerb("DELETE")
      .setUrl(`tasks/${options.uuid}`);
    this.client.try(request);
    return this.parseResponse(await this.client.try(request));
  }

  private parseResponse<R>(response: TryGettingApiResponse<R>) {
    if (response.failed()) {
      console.error(response.getException().context());
      return null;
    }

    return response.get();
  }
}

export default Task;
