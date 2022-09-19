import { Client, Request } from "@henrotaym/api-client";
import { TaskCredential } from "../credentials";
import {
  StoredTaskContract,
  TaskEndpointDestroyOptionsContract,
  TaskEndpointIndexOptionsContract,
  TaskEndpointStoreOptionsContract,
  TaskEndpointUpdateOptionsContract,
} from "../types";

class Task {
  client = new Client(new TaskCredential());

  public async index(options: TaskEndpointIndexOptionsContract) {
    const request = new Request<Array<StoredTaskContract>>()
      .setVerb("GET")
      .setUrl("tasks")
      .addQuery({ ...options, model_id: `${options.model_id}` });
    const response = await this.client.try(request);
    return response.failed() ? null : response.get();
  }

  public async store(options: TaskEndpointStoreOptionsContract) {
    const request = new Request<StoredTaskContract>()
      .setVerb("POST")
      .setUrl("tasks")
      .addData(options);
    const response = await this.client.try(request);
    return response.failed() ? null : response.get();
  }

  public async update(options: TaskEndpointUpdateOptionsContract) {
    const request = new Request<StoredTaskContract>()
      .setVerb("PUT")
      .setUrl(`tasks/${options.task.uuid}`)
      .addData(options);
    this.client.try(request);
    const response = await this.client.try(request);
    return response.failed() ? null : response.get();
  }

  public async destroy(options: TaskEndpointDestroyOptionsContract) {
    const request = new Request<StoredTaskContract>()
      .setVerb("DELETE")
      .setUrl(`tasks/${options.uuid}`);
    this.client.try(request);
    const response = await this.client.try(request);
    return response.failed() ? null : response.get();
  }
}

export default Task;
