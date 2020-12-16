import React from 'react'
import { render, cleanup, screen } from "@testing-library/react";
import FrameworkList from "./FrameworkList";

afterEach(() => {
  cleanup();
})

describe("rendering the list with props", () => {
  it("should render no data ! when no data propped", () => {
    render(<FrameworkList />)
    //html中にno data という文字が含まれているかどうか
    expect(screen.getByText("no data")).toBeInTheDocument();
  })
  it("should render list item correctly", () => {
    //ダミーデータの用意
    const dummyData = [
      {
        id: 1, item: "react dummy",
      },
      {
        id: 2, item: "vue dummy",
      },
      {
        id: 3, item: "anlular dummy",
      },
    ]
    //ダミーデータをもとにコンポーネントをレンダーする。
    render(<FrameworkList frameworks={dummyData} />);
    //レンダーされたオブジェクトからliを取得
    const frameworkItems = screen
      .getAllByRole("listitem").map((ele) => {
        //liを取得したところからtext情報だけを抜き出す
        return ele.textContent
      })

    //ダミーデータを表示に使用する内容だけ取り出し配列に直す。
    const dummyItems = dummyData.map((ele) => {
      return ele.item
    })

    //表示された要素とダミーデータの要素が一致しているかどうか
    expect(frameworkItems).toEqual(dummyItems);
    //no dataという文字列がhtml内に含まれていないことの確認。
    expect(screen.queryByText("no data")).toBeNull;

  })
})