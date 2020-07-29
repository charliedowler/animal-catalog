import React, { useState } from 'react'
import { Grid, Container, Header, Button } from 'semantic-ui-react'
import AnimalCardListItem from '../AnimalCardListItem'
import CreateAnimalForm from '../CreateAnimalForm';
import { useAnimals } from '../../hooks/useAnimals'

export const AnimalCardList = () => {
  const [createMode, setCreateMode] = useState(false)
  const { loading, error, data } = useAnimals()

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const toggleCreateMode = event => {
    event.preventDefault()
    setCreateMode(!createMode)
  }

  return <Container text style={{ marginTop: '7em' }} textAlign='left'>
    <Header as='h1'>
      Animal Top Trumps
      {createMode ? <Button floated='right' icon='long arrow alternate left' color='grey' onClick={toggleCreateMode} /> : <Button floated='right' color='blue' onClick={toggleCreateMode}>
        Add animal +
        </Button>}
    </Header>
    {createMode ? <CreateAnimalForm onSave={() => setCreateMode(false)} /> : <Grid>
      {data.animals.map(animal => <AnimalCardListItem animal={animal} />)}
    </Grid>}
  </Container>
}