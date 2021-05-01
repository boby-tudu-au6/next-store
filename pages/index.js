import * as React from 'react';
import Copyright from '../src/Copyright';
import Card from 'components/Card';
import { Grid, Typography, Container, Box } from '@material-ui/core'
import axios from 'axios';

export default function Index(props) {
  const { data, user } = props;
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} style={{ marginTop: 24 }}>
      {
        data.map(item => (
          <Grid key={item._id} item md={4} sm={6} xs={12}>
            <Card {...item} user={user} />
          </Grid>
        ))
      }
      </Grid>
    </Container>
  );
}

export const getStaticProps = async () => {
  const { data } = await axios.get('http://localhost:3000/api/product')
  // console.log(data)
    return {
      props: { data }
    }
}
