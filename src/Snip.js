import React, { useState, useRef, useEffect, useCallback} from 'react';
import { makeStyles, } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Button, Box, Container, Grid, } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FaceFeedback from "./table";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  grid_root: {
    flexGrow: 1,
  },
});

let resSkin;
let resOrgans;
export default function ImgCard(props) {
  const classes = useStyles();
  const [isSendingSkin, setIsSendingSkin] = useState(false);
  const [isSendingOrgans, setIsSendingOrgans] = useState(false);
  const isMounted = useRef(true);



  const skin_color = ['透白','白皙','自然','小麦','黝黑',];
  const left_eyelids = ['单眼皮','平行双眼皮','扇形双眼皮',];
  const right_eyelids = ['单眼皮','平行双眼皮','扇形双眼皮',];
  const crows_feet = ['无', '有',];
  const dark_circle = ['无', '色素型', '血管型', '阴影型',];
  const blackhead = ['无', '轻度', '中度', '重度'];
  const skin_type = ['油性', '干性', '中性', '混合性',]


  // const res = {"request_id":"1620115798,588af52b-1a18-4218-b1e1-e8cb29b2735d","time_used":203,"result":{"skin_color":{"value":2,"confidence":0.5478226},"skin_age":{"value":23},"left_eyelids":{"value":2,"confidence":0.86457527},"right_eyelids":{"value":2,"confidence":0.9999939},"eye_pouch":{"value":0,"confidence":0.71129924},"dark_circle":{"value":2,"confidence":0.8709661},"forehead_wrinkle":{"value":0,"confidence":0.98663366},"crows_feet":{"value":0,"confidence":0.99471366},"eye_finelines":{"value":0,"confidence":0.76371545},"glabella_wrinkle":{"value":0,"confidence":0.9948193},"nasolabial_fold":{"value":1,"confidence":0.7647579},"nasolabial_fold_severity":{"value":0,"confidence":0.38291976},"skin_type":{"skin_type":3,"details":{"0":{"value":0,"confidence":0.12770121},"1":{"value":0,"confidence":0.00048093073},"2":{"value":0,"confidence":0.015949177},"3":{"value":1,"confidence":0.85586864}}},"pores_forehead":{"value":0,"confidence":0.5738849},"pores_left_cheek":{"value":0,"confidence":0.93943983},"pores_right_cheek":{"value":0,"confidence":0.94950986},"pores_jaw":{"value":0,"confidence":0.9227658},"blackhead":{"value":1,"confidence":0.7020023},"acne":{"rectangle":[{"left":194,"top":303,"width":2,"height":2}],"confidence":[0.7635368]},"mole":{"rectangle":[{"left":250,"top":220,"width":4,"height":4},{"left":247,"top":194,"width":1,"height":1},{"left":238,"top":192,"width":4,"height":4},{"left":225,"top":157,"width":2,"height":1},{"left":246,"top":153,"width":1,"height":1}],"confidence":[0.8208402,0.50483304,0.7991118,0.7779304,0.56068426]},"skin_spot":{"rectangle":[{"left":185,"top":301,"width":4,"height":4},{"left":147,"top":269,"width":4,"height":4},{"left":198,"top":267,"width":5,"height":5},{"left":126,"top":259,"width":4,"height":4},{"left":234,"top":242,"width":5,"height":5},{"left":208,"top":238,"width":4,"height":5},{"left":202,"top":235,"width":1,"height":0},{"left":232,"top":233,"width":5,"height":5},{"left":238,"top":228,"width":4,"height":4},{"left":161,"top":222,"width":2,"height":2},{"left":228,"top":217,"width":4,"height":3},{"left":268,"top":210,"width":4,"height":5},{"left":209,"top":209,"width":2,"height":2},{"left":261,"top":202,"width":4,"height":5},{"left":197,"top":197,"width":4,"height":5},{"left":191,"top":194,"width":4,"height":5},{"left":246,"top":192,"width":3,"height":2},{"left":177,"top":166,"width":4,"height":5},{"left":108,"top":166,"width":2,"height":2},{"left":209,"top":160,"width":3,"height":2},{"left":202,"top":156,"width":5,"height":4},{"left":208,"top":153,"width":2,"height":2},{"left":122,"top":140,"width":5,"height":6},{"left":191,"top":136,"width":5,"height":6},{"left":190,"top":130,"width":2,"height":3},{"left":197,"top":129,"width":5,"height":5},{"left":173,"top":127,"width":2,"height":2},{"left":232,"top":128,"width":2,"height":3},{"left":210,"top":122,"width":4,"height":4},{"left":144,"top":115,"width":2,"height":2},{"left":228,"top":111,"width":4,"height":4},{"left":220,"top":111,"width":4,"height":4},{"left":212,"top":111,"width":1,"height":1},{"left":177,"top":108,"width":2,"height":2},{"left":208,"top":90,"width":7,"height":4},{"left":155,"top":89,"width":5,"height":6}],"confidence":[0.6794659,0.6727368,0.7586472,0.597723,0.70978504,0.784,0.501096,0.78379506,0.7839527,0.6606378,0.8354697,0.79864424,0.7808354,0.8131023,0.7687272,0.77838933,0.55426335,0.6538554,0.7515795,0.6044133,0.7972673,0.63505465,0.7730009,0.7623031,0.63691604,0.7718079,0.6167233,0.7739385,0.65120256,0.5983511,0.5979437,0.5614116,0.58953816,0.73090404,0.56540304,0.7895413]},"closed_comedones":{"rectangle":[{"left":168,"top":290,"width":2,"height":2},{"left":160,"top":284,"width":4,"height":3},{"left":157,"top":197,"width":2,"height":2},{"left":255,"top":189,"width":1,"height":0},{"left":266,"top":188,"width":2,"height":2},{"left":221,"top":187,"width":3,"height":3},{"left":201,"top":163,"width":0,"height":1},{"left":204,"top":161,"width":2,"height":2},{"left":165,"top":143,"width":0,"height":1},{"left":188,"top":123,"width":2,"height":2},{"left":190,"top":118,"width":4,"height":3},{"left":185,"top":114,"width":1,"height":1},{"left":237,"top":106,"width":1,"height":2},{"left":214,"top":90,"width":2,"height":3},{"left":225,"top":81,"width":1,"height":0}],"confidence":[0.7360865,0.7588391,0.64200145,0.6060637,0.698559,0.6635037,0.5316122,0.6298983,0.5407239,0.54378927,0.69189507,0.6087135,0.5951539,0.6341534,0.5244349]}},"warning":[],"face_rectangle":{"top":144,"left":103,"width":188,"height":188}}
  // set isMounted to false when we unmount the component
  useEffect(() => {
      return () => {
        isMounted.current = false
      }
    }, [])

  const sendSkinRequest = useCallback(async() => {

    function DataURIToBlob(dataURI) {
        const splitDataURI = dataURI.split(',')
        const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
        const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

        const ia = new Uint8Array(byteString.length)
        for (let i = 0; i < byteString.length; i++)
            ia[i] = byteString.charCodeAt(i)

        return new Blob([ia], { type: mimeString })
      }

    if (isSendingSkin) return
    // update state
    setIsSendingSkin(true)
    const file = DataURIToBlob(props.img)
    var data = new FormData();
    data.append('file', file)
//     for(var pair of data.entries()) {
//         console.log(pair[0]+ ', '+ pair[1]); 
//    }
   try{    
    const result = await fetch('http://127.0.0.1:5000/skin', {
      method: 'POST',
      //headers: { "Content-Type": "multipart/form-data" },
      body: data,
  });
    const res = await result.json(); 
    resSkin = res;
    console.log(res)
  }catch(e){
  return null;
}
if (isMounted.current) // only update if we are still mounted
setIsSendingSkin(false)
}, [isSendingSkin]) // update the callback if the state changes

const sendOrganRequest = useCallback(async() => {

  function DataURIToBlob(dataURI) {
      const splitDataURI = dataURI.split(',')
      const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
      const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

      const ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++)
          ia[i] = byteString.charCodeAt(i)

      return new Blob([ia], { type: mimeString })
    }

  if (isSendingOrgans) return
  // update state
  setIsSendingOrgans(true)
  const file = DataURIToBlob(props.img)
  var data = new FormData();
  data.append('file', file)
//     for(var pair of data.entries()) {
//         console.log(pair[0]+ ', '+ pair[1]); 
//    }
 try{    
  const result = await fetch('http://127.0.0.1:5000/face_analysis', {
    method: 'POST',
    //headers: { "Content-Type": "multipart/form-data" },
    body: data,
});
  const res = await result.json(); 
  console.log(res)
  resOrgans = res;
}catch(e){
return null;
}
if (isMounted.current) // only update if we are still mounted
setIsSendingOrgans(false)
}, [isSendingOrgans]) // update the callback if the state changes

  return (
    <Grid container className={classes.grid_root} spacing={2}>
    <Grid item xs={6}>
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
        <Button size="small" color="primary" disabled={isSendingOrgans} onClick={sendOrganRequest}>
          五官分析
        </Button>
      </CardActions>
    </Card>
    </Grid>    
    <Grid item xs={6}>
    {resSkin && <FaceFeedback 
        skin_color={skin_color[resSkin.result.skin_color.value]}
        left_eyelids={left_eyelids[resSkin.result.left_eyelids.value]}
        right_eyelids={right_eyelids[resSkin.result.right_eyelids.value]}
        crows_feet={crows_feet[resSkin.result.crows_feet.value]}
        dark_circle = {dark_circle[resSkin.result.dark_circle.value]}
        blackhead = {blackhead[resSkin.result.blackhead.value]}
        skin_type ={skin_type[resSkin.result.skin_type.skin_type]}
    />}
    </Grid>
    </Grid>
  );
}