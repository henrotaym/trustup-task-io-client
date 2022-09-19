import { JsonCredential } from "@henrotaym/api-client";
import ApiRequest from "@henrotaym/api-client/dist/Request";

class Task extends JsonCredential {
  prepare(request: ApiRequest<any>): void {
    request
      .setBaseUrl(`${process.env.MIX_TRUSTUP_TASK_IO_URL}/api/tasks`)
      .addHeaders({ Accept: "application/json" });
  }
}

export default Task;
