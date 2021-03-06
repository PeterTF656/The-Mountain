// 1. Install dependencies DONE
// 2. Import dependencies DONE
// 3. Setup webcam and canvas DONE
// 4. Define references to those DONE
// 5. Load posenet DONE
// 6. Detect function DONE
// 7. Drawing utilities from tensorflow DONE
// 8. Draw functions DONE

// Face Mesh - https://github.com/tensorflow/tfjs-models/tree/master/facemesh
import React, { useRef, useEffect, useState, useCallback } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
import data from './data/makeup_refs.json'


// NEW MODEL
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawTri } from "./utilities";
import { drawDots } from "./Dots"
import DasAlerts from "./report";
import AppBar from "./AppBar";

import {Button, Container, ButtonGroup, makeStyles, Fab, Grid, Box} from '@material-ui/core';
import {ImgCard} from "./Snip";
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
// import EditIcon from '@material-ui/icons/Edit';
// import UpIcon from '@material-ui/icons/KeyboardArrowUp';
// import { green } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(),
      marginTop: theme.spacing(3),
    },
  },
  container_root: {
    margin: theme.spacing(2),
    display: 'flex',
  },
  fab_one: {
    position: 'absolute',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
  },
}));

let timer;
let parts;

function App() {
  const classes = useStyles();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [showEyes, setShowEyes] = useState(false);
  const [draw, setDraw] = useState(-1);
  const [visible, setAlertVisibility] = useState(false);
  const [eyeVisible, setEyeVisibility] = useState(false);
  const [id_2, setId_2] = useState([0.1,0.1])
  const [id_152, setId_152] = useState([0.11,0.11])
  const [id_9, setId_9] = useState([0.111,0.111])
  const [id_10, setId_10] = useState([0.1111,0.1111])
  const [id_127, setId_127] = useState([0.2,0.2])
  const [id_130, setId_130] = useState([0.21,0.21])
  const [id_243, setId_243] = useState([0.12,0.12])
  const [id_463, setId_463] = useState([0.122,0.122])
  const [id_359, setId_359] = useState([0.212,0.212])
  const [id_356, setId_356] = useState([0.01,0.01])
  const [showCanvas, setShowCanvas] = useState(true)
  const [imgSrc, setImgSrc] = React.useState(null);

  // console.log(data.steps.length);

  useEffect(()=>{
    console.log("useeffect canvas:", showCanvas)
    if (showCanvas) {
    runFace(); 
     return () => {clearInterval(timer)}
    } else {
      clearInterval(timer)
    }
    }, [showCanvas, draw])

  // take photos
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);
    
   parts = draw;
  //detect and draw dots on face
  const runFace = useCallback(async (show) => {
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    console.log(parts);
    if (parts>-1 && parts<data.steps.length){
      console.log("running tri");
      timer = setInterval(() => {
        detectFaces(net) ;
      }, 10);
    }else{
      console.log("running dots");
    timer = setInterval(() => {
      detectDots(net) ;
    }, 10);}
    return timer;
  },[showCanvas]);

  const detectDots = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      if (canvasRef.current !== null) {
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      }
      const face = await net.estimateFaces({input:video});

      if (typeof face["0"] !== "undefined") {        
        setId_9(face["0"].scaledMesh[9]);
        setId_10(face["0"].scaledMesh[10]);
        setId_2(face["0"].scaledMesh[2]);
        setId_152(face["0"].scaledMesh[152]);
        setId_127(face["0"].scaledMesh[127]);
        setId_130(face["0"].scaledMesh[130]); 
        setId_243(face["0"].scaledMesh[243]);
        setId_463(face["0"].scaledMesh[463]);
        setId_359(face["0"].scaledMesh[359]);
        setId_356(face["0"].scaledMesh[356]);
      }
      // Get canvas context
      if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      
      requestAnimationFrame(()=>{drawDots(face, ctx, draw, showCanvas)});
      }
    }
  };

  // const detectTri = async (net) => {
  //   if (
  //     typeof webcamRef.current !== "undefined" &&
  //     webcamRef.current !== null &&
  //     webcamRef.current.video.readyState === 4
  //   ) {
  //     // Get Video Properties
  //     const video = webcamRef.current.video;
  //     const videoWidth = webcamRef.current.video.videoWidth;
  //     const videoHeight = webcamRef.current.video.videoHeight;

  //     // Set video width
  //     webcamRef.current.video.width = videoWidth;
  //     webcamRef.current.video.height = videoHeight;

  //     // Set canvas width
  //     if (canvasRef.current !== null) {
  //     canvasRef.current.width = videoWidth;
  //     canvasRef.current.height = videoHeight;
  //     }
  //     const face = await net.estimateFaces({input:video});

  //     if (typeof face["0"] !== "undefined") {        
  //       setId_9(face["0"].scaledMesh[9]);
  //       setId_10(face["0"].scaledMesh[10]);
  //       setId_2(face["0"].scaledMesh[2]);
  //       setId_152(face["0"].scaledMesh[152]);
  //       setId_127(face["0"].scaledMesh[127]);
  //       setId_130(face["0"].scaledMesh[130]); 
  //       setId_243(face["0"].scaledMesh[243]);
  //       setId_463(face["0"].scaledMesh[463]);
  //       setId_359(face["0"].scaledMesh[359]);
  //       setId_356(face["0"].scaledMesh[356]);
  //     }
  //     // Get canvas context
  //     if (canvasRef.current !== null) {
  //     const ctx = canvasRef.current.getContext("2d");
  //     requestAnimationFrame(()=>{drawTri(face, ctx, 1, showCanvas)});
  //     }
  //   }
  // };

  const detectFaces = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      if (canvasRef.current !== null) {
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      }
      const face = await net.estimateFaces({input:video});

      if (typeof face["0"] !== "undefined") {        
        setId_9(face["0"].scaledMesh[9]);
        setId_10(face["0"].scaledMesh[10]);
        setId_2(face["0"].scaledMesh[2]);
        setId_152(face["0"].scaledMesh[152]);
        setId_127(face["0"].scaledMesh[127]);
        setId_130(face["0"].scaledMesh[130]); 
        setId_243(face["0"].scaledMesh[243]);
        setId_463(face["0"].scaledMesh[463]);
        setId_359(face["0"].scaledMesh[359]);
        setId_356(face["0"].scaledMesh[356]);
      }
      // Get canvas context
      if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(()=>{drawTri(face, ctx, parts, showCanvas)});
      }
    }
  };


  const requestMakeup = useCallback(async()=> {
    try {
      const result = await fetch('http://127.0.0.1:5000/reload_makeup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify("give me makeup")
      });
      
      const res = await result.json(); 
      
    } catch (error) {
      return null
    }
  })

  return (
    <div className="App">
      <AppBar/>
      <Container className={classes.container_root}>
      {/* <Button variant="contained" color="secondary" onClick={capture}>????????????</Button> */}
      <Grid container 
        spacing={2} style={{margin: 10}}>
      <Grid item xs={3}>
      <Fab size="small" color="primary" aria-label="add" onClick={capture}> 
        <CameraAltRoundedIcon />
      </Fab>
      </Grid>
        {/* second button group */}
        <Grid item xs={9}
        display="flex"
        >
      <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
        <Button
          onClick={() => setDraw(draw + 1)}
        >
          ?????????????????????
        </Button>
        <Button
          onClick={() => setDraw(draw - 1)}
        >
          ?????????????????????
        </Button>
        <Button 
        onClick={()=> setTimeout(() => {setAlertVisibility(true)},3000)}>
          ??????????????????
      </Button>
      <Button 
        onClick={()=> setTimeout(() => {setEyeVisibility(true)},5000)}>
          ??????????????????
      </Button>
      <Button 
        onClick={()=>{setShowCanvas(true)}}>
          ????????????
      </Button>
      <Button 
        onClick={()=> {setShowCanvas(false)}}>
          ????????????
      </Button>
      <Button onClick={requestMakeup}>
        ????????????
      </Button>
        </ButtonGroup>
        </Grid>
        
      {/* <div>current draw is {draw}.</div> */}
      <Grid item xs={12}>
        {imgSrc && (
            // <img
            //   src={imgSrc}
            // />
            <ImgCard img={imgSrc} />
        )}
        </Grid>
        </Grid>
      </Container>
      <div>
      <DasAlerts
        visible={visible}
        duration={20000000}
        onDurationEnd={setAlertVisibility}
      >
        <div>?????????????????????{(id_9[1]-id_10[1])/(id_152[1]-id_10[1])}:{(id_2[1]-id_9[1])/(id_152[1]-id_10[1])}:{(id_152[1]-id_2[1])/(id_152[1]-id_10[1])};{"\n"}
        ?????????????????????{(id_130[0]-id_127[0])/(id_356[0]-id_127[0])}:{(id_243[0]-id_130[0])/(id_356[0]-id_127[0])}:{(id_463[0]-id_243[0])/(id_356[0]-id_127[0])}:
        {(id_359[0]-id_463[0])/(id_356[0]-id_127[0])}:
        {(id_356[0]-id_359[0])/(id_356[0]-id_127[0])}
        </div>
        </DasAlerts>
      </div>
      <div>
      <DasAlerts
        visible={eyeVisible}
        duration={20000000}
        onDurationEnd={setEyeVisibility}
      >
        <div>????????????????????????????????????????????????85?????????????????????????????????????????????????????????80?????????????????????????????????80??????????????????????????????80?????????</div>
        </DasAlerts>
      </div>
      <div>
      <DasAlerts
        visible={eyeVisible}
        duration={20000000}
        onDurationEnd={setEyeVisibility}
      >
        <div>??????????????????????????????????????? {"\n"}1. ???????????????C???????????????????????????????????? {"\n"} 
        2. ???????????????????????????????????????????????????????????????  {"\n"}3. ??????????????????????????????????????????????????????????????? {"\n"} 
        4. ??????????????????????????????????????? {"\n"} 5. ??????????????????????????????????????????  {"\n"}
        6. ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????  {"\n"}
        7. ????????????????????????</div>
        </DasAlerts>
      </div>
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 1000,
            height: 750,
          }}
        />
        {showCanvas === true &&
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 1000,
            height: 750,
          }}
        />
        }
        {/* {showCanvas === false &&
        <canvas
          ref={canvasRef_Tri}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 1000,
            height: 750,
          }}
        />} */}
      </header>
    </div>
  );
}

export default App;
