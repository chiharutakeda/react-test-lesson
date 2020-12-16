import React from 'react'

function FrameworkList(props) {
  if (!props.frameworks || !props.frameworks.length) {
    return <div>no data</div>
  }
  return (
    <div>
      {props.frameworks.map(({ id, item }) => (
        <li key={id}>{item}</li>
      ))}
    </div>
  )
}

export default FrameworkList
