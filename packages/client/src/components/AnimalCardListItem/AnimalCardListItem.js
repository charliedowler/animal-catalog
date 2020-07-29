import React, { useState } from 'react'
import { Grid, Image, Card, List, Button } from 'semantic-ui-react'
import { AnimalCardEdit } from './AnimalCardListItemEdit';
import { useDeleteAnimal } from '../../hooks/useDeleteAnimal';

const AnimalCardListItemContainer = ({ animal, children }) => {
  const imageLabelProps = {
    as: 'a',
    color: animal.extinct ? 'red' : 'green',
    content: animal.extinct ? 'Extinct ☠️' : 'Still around 👌🏼',
    ribbon: true,
  }
  return <Grid.Column width={8} key={animal.name} data-id={animal.id}>
    <Card fluid>
      <Image src={animal.image} wrapped ui={false} label={imageLabelProps} />
      {children}
    </Card>
  </Grid.Column>
}


export const AnimalCardListItem = ({ animal }) => {
  const [editMode, setEditMode] = useState(false)
  const [, deleteAnimal] = useDeleteAnimal(animal.id)

  if (editMode) {
    return (<AnimalCardListItemContainer animal={animal}>
      <AnimalCardEdit animal={animal} onSave={() => setEditMode(false)} />
    </AnimalCardListItemContainer>)
  }

  const { name, type, carnivore } = animal

  return (<AnimalCardListItemContainer animal={animal}>
    <Card.Content>
      <Card.Header data-id="name">
        {name}
      </Card.Header>
      <Card.Meta>
      </Card.Meta>
    </Card.Content>
    <Card.Content>
      <Card.Description>
        <List bulleted>
          <List.Item>
            {type ? type : 'Unknown type'}
          </List.Item>
          <List.Item>
            {carnivore ? 'Carnivorous 🍖' : 'Herbivore 🌿'}
          </List.Item>
        </List>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <div className='ui two buttons'>
        <Button basic color='blue' id='edit' onClick={() => setEditMode(true)}>
          Edit
          </Button>
        <Button basic color='red' onClick={deleteAnimal}>
          Remove
          </Button>
      </div>
    </Card.Content>
  </AnimalCardListItemContainer>)
}