import React, { useState } from 'react'
import Btn from './btn'

export default function Recomdation(props) {
  const [value, setValue] = useState('')
  const [onInput, setInput] = useState(false)
  const [suggestion, setSuggestion] = useState(props.suggestion)

  return (
    <>
      <label htmlFor="state" className="block">
        {props.name}
      </label>
      <div className="state py-2 w-full">
        <div className="state-items flex flex-row flex-wrap">
          {props.Array.map((value, key) => {
            return (
              <Btn
                key={key}
                value={value}
                stateArray={props.Array}
                changeArray={props.changeArray}
              />
            )
          })}
        </div>
        <div className="w-full">
          <input
            id="state"
            name="state"
            value={value}
            autoComplete="off"
            onChange={(event) => {
              setValue(event.target.value)
              setInput(true)
              let subString = event.target.value
              if (subString === '') {
                setInput(false)
                setSuggestion(props.suggestion)
                return
              }
              console.log(event.target.value)
              let newSuggestion = []

              for (let i = 0; i < suggestion.length; i++) {
                if (
                  suggestion[i].toLowerCase().includes(subString.toLowerCase())
                ) {
                  newSuggestion.push(suggestion[i])
                }
              }
              setSuggestion(newSuggestion)
            }}
            className="block bg-transparent outline-none w-full"
          />
          {onInput && (
            <div className="flex flex-col absolute nform-sugg">
              {suggestion.map((value, key) => {
                return (
                  <div
                    key={key}
                    onClick={(event) => {
                      let val = event.target.childNodes[0].data
                      props.Array.push(value)
                      props.setArray(props.Array)
                      setInput(false)
                      setValue('')
                      console.log(props.suggestion)
                      setSuggestion(props.suggestion)
                    }}
                  >
                    {value}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
