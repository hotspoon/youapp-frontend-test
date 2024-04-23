"use client"
import React, { KeyboardEventHandler, useId } from "react"

import CreatableSelect from "react-select/creatable"
import { useValues } from "./use-value"

const components = {
  DropdownIndicator: null
}

interface Option {
  readonly label: string
  readonly value: string
}

const createOption = (label: string) => ({
  label,
  value: label
})

function EditInterestForm() {
  const [inputValue, setInputValue] = React.useState("")
  const [value, setValue] = React.useState<readonly Option[]>([])
  const { setValuesEdit } = useValues()

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputValue) return
    switch (event.key) {
      case "Enter":
      case "Tab":
        setValue((prev) => [...prev, createOption(inputValue)])
        setInputValue("")
        event.preventDefault()
    }
  }

  React.useEffect(() => {
    setValuesEdit(value.map((option) => option.value))
  }, [value])

  return (
    <CreatableSelect
      instanceId={useId()}
      components={components}
      inputValue={inputValue}
      isClearable
      isMulti
      menuIsOpen={false}
      onChange={(newValue) => setValue(newValue)}
      onInputChange={(newValue) => setInputValue(newValue)}
      onKeyDown={handleKeyDown}
      placeholder="Type something and press enter..."
      value={value}
    />
  )
}

export default EditInterestForm
