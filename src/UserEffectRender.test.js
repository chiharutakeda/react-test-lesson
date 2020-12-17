import React from 'react'
import { render, screen } from "@testing-library/react";

import UseEffectRender from './UseEffectRender';

describe("useEffect rendering", () => {
  //非同期系のテストはasyncを使うようにする。
  it("should render only after async function resolved", async () => {
    render(<UseEffectRender />);
    //画面上にレンダリング直後は文字列I am が存在しないことを確認する
    expect (screen.queryByText(/I amv/)).toBeNull();
    //非同期処理を4秒間くらい待ってI am が存在することを確認する。
    //findByTextは非同期処理の完了を待ってくれる
    expect (await screen.findByText (/I am/)).toBeInTheDocument();
  })
})