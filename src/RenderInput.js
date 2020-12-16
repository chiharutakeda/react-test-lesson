import React, { useState } from 'react'

function RenderInput({ outputConsole }) {

  const [input, setInput] = useState("");

  const outputValue = () => {
    if (input) {
      outputConsole(input)
    }
  }
  const updateValue = (e) => {
    setInput(e.target.value)
  }

  return (
    <div>
      <input type="text" placeholder="Enter" value={input} onChange={updateValue}></input>
      <button onClick={outputValue}>console</button>
    </div>
  )
}

export default RenderInput
