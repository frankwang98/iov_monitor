import Mock from "mockjs";
import type { MockParams } from "./index.d";
import MockIndex from "./mock-index";

Mock.setup({
  // 刷新时间
  timeout: 300,
});

const mocks: MockParams[] = MockIndex;

export function mockXHR() {
  mocks.forEach(({ url, type = "get", response }) => {
    Mock.mock(new RegExp(url), type, response);
  });
}
