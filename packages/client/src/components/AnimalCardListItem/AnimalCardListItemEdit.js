import React from 'react'
import { Card, Checkbox, Form } from 'semantic-ui-react'
import get from 'lodash/get'
import { useUpdateAnimal } from '../../hooks/useUpdateAnimal'
import { AnimalDropdownTypes } from '../../constants'
import { useFormData } from '../../hooks/useFormData'

export const AnimalCardEdit = ({ animal, onSave }) => {
  const [, updateAnimal] = useUpdateAnimal()
  const {
    formState,
    useInputField,
    useSelectField,
    useCheckboxField
  } = useFormData({ id: animal.id })
  const onSaveClick = () => {
    updateAnimal(formState)
    onSave()
  }

  const onNameChange = useInputField('name')
  const onTypeChange = useSelectField('type')
  const onExtinctChange = useCheckboxField('extinct')
  const onCarnivoreChange = useCheckboxField('carnivore')

  const type = get(formState, 'type', animal.type)
  const extinct = get(formState, 'extinct', animal.extinct)
  const carnivore = get(formState, 'carnivore', animal.carnivore)

  const isMissingName = formState.name === ''

  return (<Card.Content>
    <Form>
      <Form.Field>
        <label>Name</label>
        <input
          data-id='name-input'
          placeholder='Name'
          onChange={onNameChange}
          defaultValue={animal.name}
        />
      </Form.Field>
      <Form.Select
        fluid
        data-id='type-selector'
        label='Type'
        options={AnimalDropdownTypes}
        placeholder='Type'
        value={type}
        onChange={onTypeChange}
      />
      <Form.Field>
        <Checkbox
          data-id='extinct-checkbox'
          label='Extinct'
          checked={extinct}
          onChange={onExtinctChange}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          data-id='carnivore-checkbox'
          label='Carnivorous'
          checked={carnivore}
          onChange={onCarnivoreChange}
        />
      </Form.Field>
      <Form.Button
        basic
        color='green'
        fluid
        data-id='save-button'
        disabled={isMissingName}
        onClick={onSaveClick}>
        Save
        </Form.Button>
    </Form>
  </Card.Content>)
}