import { useState } from 'react'
const useInputField = (state, setter) => {
  return field => e => setter({
    ...state,
    [field]: e.target.value
  })
}

const useSelectField = (state, setter) => {
  return field => (_, data) => setter({
    ...state,
    [field]: data.value
  })
}


const useCheckboxField = (state, setter) => {
  return field => (_, data) => setter({
    ...state,
    [field]: data.checked
  })
}

export const useFormData = (initialState = {}) => {
  const [state, setter] = useState(initialState)
  return {
    useSelectField: useSelectField(state, setter),
    useInputField: useInputField(state, setter),
    useCheckboxField: useCheckboxField(state, setter),
    formState: state
  }
}