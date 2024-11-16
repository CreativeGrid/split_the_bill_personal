import { testChatGPT } from "./chatgpt";

interface doGetEvent {
  queryString: string;
  parameter: { [key: string]: string };
  parameters: { [key: string]: string[] };
  contextPath: string;
  contentLength: number;
  pathInfo: string;
}

function doGet(e: doGetEvent) {
  return testChatGPT();
}
