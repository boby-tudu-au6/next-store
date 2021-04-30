import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import { 
    Typography, Card, CardActionArea, CardActions,
    CardContent, CardMedia, Button
} from '@material-ui/core';
import axios from 'axios';

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

  const addItemToCart = async (product) => {
    try {
      const { data } = await axios.post('/api/user/cart', {
        product, user: user._id
      });
      console.log(data);
    } catch (error) {
      console.log(error.message);
      console.log(error.response)
    }
  }

  return (
        <Card className={classes.root}>
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
