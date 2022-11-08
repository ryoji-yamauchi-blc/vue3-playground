import { describe, test, expect, afterEach, vi } from "vitest";
import {
  render,
  fireEvent,
  cleanup,
  type RenderResult,
} from "@testing-library/vue";
import UserCreatePage from "@/components/pages/UserCreatePage/UserCreatePage.vue";
import { client } from "@/api/client";

// APIクライアントのモック
vi.mock("@/api/client", () => {
  return {
    client: {
      post: vi.fn(
        () => new Promise((resolve) => setTimeout(() => resolve({}), 1000))
      ),
    },
  };
});

const renderPage = () => render(UserCreatePage);

const updateFormValue = async (methods: RenderResult) => {
  const id = methods.getByLabelText("ユーザID");
  const name = methods.getByLabelText("名前");
  await fireEvent.update(id, "Nomura");
  await fireEvent.update(name, "野村");
};

describe("ユーザーフォームのテスト", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  test("未入力状態でsubmitボタンを押下すると、バリデーションエラーメッセージが表示されること。", async () => {
    const methods = renderPage();
    expect(methods.queryAllByText("入力してください。").length).toBe(0);
    const submitButton = methods.getByText("submit");
    await fireEvent.click(submitButton);
    const errorMessages = await methods.findAllByText("入力してください。");
    expect(errorMessages.length).toBe(2);
  });

  test("フォーム入力後submitボタンを押下すると、submitボタンは...登録中の表示になりdisabledになること。", async () => {
    const methods = renderPage();
    await updateFormValue(methods);

    const submitButton = methods.getByText("submit");
    await fireEvent.click(submitButton);
    const mayBeDisabledButton = await methods.findByText("...登録中");
    expect(mayBeDisabledButton).toBeDisabled();
  });

  test("APIリクエストのBodyにユーザー入力値がセットされていること。", async () => {
    const methods = renderPage();
    await updateFormValue(methods);

    const submitButton = methods.getByText("submit");
    await fireEvent.click(submitButton);
    await methods.findByText("...登録中");
    expect(client.post).toHaveBeenCalledWith("/users", {
      id: "Nomura",
      name: "野村",
    });
  });
});
