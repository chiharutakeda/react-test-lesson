import React from "react";
import { render, screen, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import RenderInput from "./RenderInput";
import { isAsyncThunkAction } from "@reduxjs/toolkit";

afterEach(() => {
  cleanup();
})

describe("Rendering", () => {
  it("Should render all the elements correctly", () => {
    render(<RenderInput />)
    expect(screen.getByRole("button")).toBeTruthy()
    expect(screen.getByPlaceholderText("Enter")).toBeTruthy()
  })
})

describe("input form onChange event", () => {
  it("should update input value correctly", () => {
    render(<RenderInput />);
    const inputValue = screen.getByPlaceholderText("Enter");
    userEvent.type(inputValue, "test");
    expect(inputValue.value).toBe("test")
  })
})

describe("console button conditionally triggered", () => {
  it("should not trigger output function", () => {
    //ダミー関数の作成
    const outputConsole = jest.fn();
    //ダミー関数を渡してコンポーネントを呼び出す
    render(<RenderInput outputConsole={outputConsole} />)
    //ユーザーがボタンを押すイベント
    userEvent.click(screen.getByRole("button"))
    //ダミー関数が呼び出されないかの確認
    expect(outputConsole).not.toHaveBeenCalledWith(0);
  })
  it("shold trigger output function", () => {
    //ダミー関数渡す
    const outputConsole = jest.fn();
    //ダミー関数を渡してコンポーネントを呼び出す
    render(<RenderInput outputConsole={outputConsole} />)
    //入力できる所の取得をする。
    const inputValue = screen.getByPlaceholderText("Enter");
    //入力欄にユーザーがtestと打ち込む
    userEvent.type(inputValue, "test");
    //ユーザーがボタンをクリックする。
    userEvent.click(screen.getByRole("button"));
    //ダミー関数が呼ばれる。
    expect(outputConsole).not.toHaveBeenCalledWith(1);
  })
})