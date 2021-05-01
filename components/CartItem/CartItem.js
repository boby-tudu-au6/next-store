import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import { Delete } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: 8
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: 12
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 200,
  },
  controls: {
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MediaControlCard(props) {
  const { quantity, deleteProduct, product: { name, price, media, desc, _id }} = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
    <CardMedia
      className={classes.cover}
      image={media}
      title={name}
    />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {price} Rs.
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Typography variant="subtitle2" style={{ marginBottom: 12 }}>Quantity - {quantity}</Typography>
          <Button variant="contained"
          onClick={() => deleteProduct(_id)}
          startIcon={<Delete />} style={{
            background: 'red'
          }}>Delete</Button>
        </div>
      </div>
    </Card>
  );
}
