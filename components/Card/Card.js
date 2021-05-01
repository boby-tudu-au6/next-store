import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { 
    Typography, Card, CardActionArea, CardActions,
    CardContent, CardMedia, Button
} from '@material-ui/core';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Snackbar from 'components/Snackbar';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const { name, price, media, desc, _id, user } = props;
  const classes = useStyles();
  const [state, setstate] = useState({
    title: '',
    severity: '',
    open: false
  })

  const addItemToCart = async (product) => {
    try {
      const cookies = parseCookies();
      if (cookies && cookies.user) {
        const { token } = JSON.parse(cookies.user);
        const { data } = await axios.post(`http://localhost:3000/api/user/cart`, {
          product, quantity: 1, token
        });
        console.log(data.message);
        setstate({ title: data.message, severity: 'success', open: true });
      }
    } catch (error) {
      setstate({ title: error.message, severity: 'erro', open: true });
    }
  }

  return (
        <Card className={classes.root}>
          <Snackbar {...state} />
          <Link href={`/product/${_id}`}>
            <a>
              <CardActionArea>
                  <CardMedia
                  className={classes.media}
                  image={media}
                  title="Contemplative Reptile"
                  />
                  <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                      {name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                      {desc}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" component="p">
                      {price}
                  </Typography>
                  </CardContent>
              </CardActionArea>
              </a>
          </Link>
          <CardActions>
              <Button onClick={() => addItemToCart(_id)} size="small" color="primary" variant="outlined">
              Add To Cart
              </Button>
              <Button size="small" color="primary" variant="outlined">
              Buy Now
              </Button>
          </CardActions>
        </Card>
  );
}
