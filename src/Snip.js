import React, { useState, useRef, useEffect, useCallback} from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function ImgCard(props) {
  const classes = useStyles();
  const [isSendingSkin, setIsSendingSkin] = useState(false);
  const [isSendingOrgans, setIsSendingOrgans] = useState(false);
  const isMounted = useRef(true);

  // set isMounted to false when we unmount the component
  useEffect(() => {
      return () => {
        isMounted.current = false
      }
    }, [])

  const sendSkinRequest = useCallback(async() => {
    if (isSendingSkin) return
    // update state
    setIsSendingSkin(true)
    var data = new FormData();
    var file = props.img
    data.append('file', file)
    for(var pair of data.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
   }
   try{    
    const result = await fetch('https://aebbe9f73e8e.ngrok.io/predict', {
      method: 'POST',
      //headers: { "Content-Type": "multipart/form-data" },
      body: data,
  });
    const res = await result.json(); 
    console.log(res)
  }catch(e){
  return null;
}
if (isMounted.current) // only update if we are still mounted
setIsSendingSkin(false)
}, [isSendingSkin]) // update the callback if the state changes

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={props.img}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            截图结果区
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            可以选择将截图上传至启凌服务器，查看自己脸部的皮肤情况和五官比例分析～
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" disabled={isSendingSkin} onClick={sendSkinRequest}>
          皮肤状态
        </Button>
        <Button size="small" color="primary">
          五官分析
        </Button>
      </CardActions>
    </Card>
  );
}