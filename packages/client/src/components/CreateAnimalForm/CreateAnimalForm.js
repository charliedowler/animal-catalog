import React from 'react'
import { Form, Checkbox, Container } from 'semantic-ui-react'
import { AnimalDropdownTypes } from '../../constants'
import get from 'lodash/get'
import { useCreateAnimal } from '../../hooks/useCreateAnimal'
import { v4 as uuidv4 } from 'uuid';
import { isEmpty } from 'lodash'
import { useFormData } from '../../hooks/useFormData'

export const CreateAnimalForm = ({ onSave }) => {
  const { formState, useSelectField, useInputField, useCheckboxField } = useFormData()
  const [, createAnimal] = useCreateAnimal()
  const handleUpdate = () => {
    createAnimal({
      ...formState,
      id: uuidv4()
    })
    onSave()
  }
  const handleName = useInputField('name')
  const handleType = useSelectField('type')
  const handleExtinct = useCheckboxField('extinct')
  const handleCarnivore = useCheckboxField('carnivore')

  return (<Container text>
    <Form>
      <Form.Field>
        <label>Name</label>
        <input placeholder='Name' onChange={handleName} defaultValue={formState.name} />
      </Form.Field>
      <Form.Select
        fluid
        label='Type'
        options={AnimalDropdownTypes}
        placeholder='Type'
        onChange={handleType}
      />
      <Form.Field>
        <Checkbox label='Extinct' checked={get(formState, 'extinct', false)} onChange={handleExtinct} />
      </Form.Field>
      <Form.Field>
        <Checkbox label='Carnivorous' checked={get(formState, 'carnivore', false)} onChange={handleCarnivore} />
      </Form.Field>
      <Form.Button disabled={isEmpty(formState.name)} basic color='green' fluid onClick={handleUpdate}>
        Save
        </Form.Button>
    </Form>
  </Container>)
}