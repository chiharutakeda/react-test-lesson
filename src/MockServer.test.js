import React from "react";
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { rest } from "msw";
import { setupServer } from "msw/node";

import MockServer from "./MockServer";

//疑似的なAPIのエンドポイントの作成///////////////////
const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy" }));
  })
)
//テストの前に一度だけ実行される
beforeAll(() => {
  //疑似サーバー起動
  server.listen()
})

//各テストケースごとに実行される。
afterEach(() => {
  server.resetHandlers();
  cleanup();
})

//テスト終了後に毎回呼ばれる。
afterAll(() => {
  //疑似サーバー終了
  server.close()
})
//////////////////////////////////////////////////////
describe("mocking API", () => {
  it("[fetch success] shouled display fetched data correctly and button disable", async () => {
    //レンダーする。
    render(<MockServer />);
    //buttonを取得してクリックする
    userEvent.click(screen.getByRole("button"));
    //画面にBred dummyが表示されるまで非同期処理を待ち、
    expect(await screen.findByText("Bred dummy")).toBeInTheDocument();
    //button要素を取得し属性がdisableであるかどうかをテスト
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  })

  it("[fetch failure] should display error msg,no render heading and button abled", async () => {
    // ここのitの中だけで使うserverを設定できる
    server.use(rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
      return res(ctx.status(404));
    }))
    //レンダーする。
    render(<MockServer />);
    //buttonを取得してクリックする
    userEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent("fetching failed !");
    //ヘッダー情報が存在しない事
    expect (screen.queryByRole ("heading")).toBeNull();
    //button属性にdisabledがないことを確認
    expect (screen.getByRole ("button")).not.toHaveAttribute ("disabled")
  })
})