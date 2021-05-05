// 1. Install dependencies DONE
// 2. Import dependencies DONE
// 3. Setup webcam and canvas DONE
// 4. Define references to those DONE
// 5. Load posenet DONE
// 6. Detect function DONE
// 7. Drawing utilities from tensorflow DONE
// 8. Draw functions DONE

// Face Mesh - https://github.com/tensorflow/tfjs-models/tree/master/facemesh

import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import * as tf from "@tensorflow/tfjs";
// OLD MODEL
//import * as facemesh from "@tensorflow-models/facemesh";

// NEW MODEL
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawTri } from "./utilities";
import { drawDots } from "./Dots"
import DasAlerts from "./report";
import AppBar from "./AppBar";

import {Button, Container, ButtonGroup, makeStyles, Fab} from '@material-ui/core';
import ImgCard from "./Snip.js";

// import AddIcon from '@material-ui/icons/Add';
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
  container_root: {
    margin: theme.spacing(2),
  },
  // fab_one: {
  //   position: 'absolute',
  //   bottom: theme.spacing(2),
  //   left: theme.spacing(2),
  // },
  // fab_two: {
  //   position: 'absolute',
  //   bottom: theme.spacing(3),
  //   left: theme.spacing(2),
  // },
  // fab_three: {
  //   position: 'absolute',
  //   bottom: theme.spacing(4),
  //   left: theme.spacing(2),
  // },
  // fab_four: {
  //   position: 'absolute',
  //   bottom: theme.spacing(5),
  //   left: theme.spacing(2),
  // },
  // fab_five: {
  //   position: 'absolute',
  //   bottom: theme.spacing(6),
  //   left: theme.spacing(2),
  // },
  // fab_six: {
  //   position: 'absolute',
  //   bottom: theme.spacing(7),
  //   left: theme.spacing(2),
  // },
  },
}));


function App() {
  const classes = useStyles();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasRef_Tri = useRef(null);
  const [draw, setDraw] = useState(0);
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

  // take photos
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot({width: 400, height: 400});
      setImgSrc(imageSrc);
    }, [webcamRef, setImgSrc]);


  //  Load posenet
  const runFaceTri = async (key) => {
    // OLD MODEL
    // const net = await facemesh.load({
    //   inputResolution: { width: 640, height: 480 },
    //   scale: 0.8,
    // });
    // NEW MODEL
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detectTri(net, key);
    }, 1);
  };

  const detectTri = async (net, key) => {
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
      if (canvasRef_Tri.current !== null) {
      canvasRef_Tri.current.width = videoWidth;
      canvasRef_Tri.current.height = videoHeight;
      }

      const face = await net.estimateFaces({input:video});
      // console.log(face);

      
      if (typeof face["0"] !== "undefined") {        
        // face["0"].scaledMesh[9] = parseFloat(face["0"].scaledMesh[9]).toFixed(4);
        // face["0"].scaledMesh[10] = parseFloat(face["0"].scaledMesh[10]).toFixed(4);
        // face["0"].scaledMesh[2] = parseFloat(face["0"].scaledMesh[2]).toFixed(4);
        // face["0"].scaledMesh[152] = parseFloat(face["0"].scaledMesh[152]).toFixed(4);
        // face["0"].scaledMesh[127] = parseFloat(face["0"].scaledMesh[127]).toFixed(4);
        // face["0"].scaledMesh[130] = parseFloat(face["0"].scaledMesh[130]).toFixed(4);
        // face["0"].scaledMesh[243] = parseFloat(face["0"].scaledMesh[243]).toFixed(4);
        // face["0"].scaledMesh[463] = parseFloat(face["0"].scaledMesh[463]).toFixed(4);
        // face["0"].scaledMesh[359] = parseFloat(face["0"].scaledMesh[359]).toFixed(4);
        // face["0"].scaledMesh[356] = parseFloat(face["0"].scaledMesh[356]).toFixed(4);
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
      if (canvasRef_Tri.current !== null) {
      const ctx = canvasRef_Tri.current.getContext("2d");
      requestAnimationFrame(()=>{drawTri(face, ctx, draw, (draw > 0 ? false : true))});
      }
    }
  };

  const runFaceDots = async (key) => {
    // OLD MODEL
    // const net = await facemesh.load({
    //   inputResolution: { width: 640, height: 480 },
    //   scale: 0.8,
    // });
    // NEW MODEL
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {
      detectDots(net, key);
    }, 1);
  };

  const detectDots = async (net, key) => {
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

      // Make Detections
      // OLD MODEL
      //       const face = await net.estimateFaces(video);
      // NEW MODEL
      const face = await net.estimateFaces({input:video});
      // console.log(face);
      // Get canvas context
      if (canvasRef.current !== null) {
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(()=>{drawDots(face, ctx, draw, (draw > 0 ? false : true))});
      }
    }
  };

  useEffect(()=>{runFaceTri(); return () => {}},[showCanvas]);
  useEffect(()=>{runFaceDots(); return () => {}}, [showCanvas])

  return (
    <div className="App">
      <AppBar/>
      <Container className={classes.container_root}>
      <Container className={classes.container_root}>
      <Button variant="contained" color="secondary" onClick={capture}>拍照截图</Button>
        {imgSrc && (
            // <img
            //   src={imgSrc}
            // />
            <ImgCard img={imgSrc} />
        )}
      </Container>
        {/* second button group */}
      <div className={classes.root}>
      <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
        <Button
          onClick={() => setDraw(draw + 1)}
        >
          下一个部位建模
        </Button>
        <Button
          onClick={() => setDraw(draw - 1)}
        >
          返回上一个部位
        </Button>
        </ButtonGroup>
      </div>
      {/* <div>current draw is {draw}.</div> */}
      <div className={classes.root}>
      <ButtonGroup size="small" variant="contained" color="secondary" aria-label="contained primary button group">
      <Button 
        onClick={()=> setTimeout(() => {setAlertVisibility(true)},3000)}>
          全脸扫描反馈
      </Button>
      <Button 
        onClick={()=> setTimeout(() => {setEyeVisibility(true)},5000)}>
          眼部扫描反馈
      </Button>
      </ButtonGroup>
      </div>
      <div className={classes.root}>
      <ButtonGroup size="small" variant="contained" color="secondary" aria-label="contained primary button group">
      <Button 
        onClick={()=>{setShowCanvas(true)}}>
          显示标点
      </Button>
      <Button 
        onClick={()=> {setShowCanvas(false)}}>
          隐藏标点
      </Button>
      </ButtonGroup>
      </div>

      </Container>
      <div>
      <DasAlerts
        visible={visible}
        duration={20000000}
        onDurationEnd={setAlertVisibility}
      >
        <div>你的三庭比例为{(id_9[1]-id_10[1])/(id_152[1]-id_10[1])}:{(id_2[1]-id_9[1])/(id_152[1]-id_10[1])}:{(id_152[1]-id_2[1])/(id_152[1]-id_10[1])};{"\n"}
        你的五眼比例为{(id_130[0]-id_127[0])/(id_356[0]-id_127[0])}:{(id_243[0]-id_130[0])/(id_356[0]-id_127[0])}:{(id_463[0]-id_243[0])/(id_356[0]-id_127[0])}:
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
        <div>眼睛长度相较于五眼的比例：合适（85分）；眼睛宽度相较于中庭的比例：合适（80分）；眉眼距离：合适（80分）；眼间距：合适（80分）。</div>
        </DasAlerts>
      </div>
      <div>
      <DasAlerts
        visible={eyeVisible}
        duration={20000000}
        onDurationEnd={setEyeVisibility}
      >
        <div>建议：使用妆容：日常妆容。 {"\n"}1. 眉头至眼角C型区上阴影，加强立体感。 {"\n"} 
        2. 由眼皮至眉尾使用深色系眼影淡扫，加强层次感  {"\n"}3. 在下眼睑和眼尾使用深色系眼影淡扫，拉长眼长 {"\n"} 
        4. 使用棕橘色加深褶皱和下眼尾 {"\n"} 5. 在瞳孔正上方眼皮使用亮色点涂  {"\n"}
        6. 画内眼线和外眼线，外眼线眼尾微微上翘。若褶皱明显，建议省略外眼线，避免妆感过重  {"\n"}
        7. 夹睫毛，上睫毛膏</div>
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
        />}
        {showCanvas === false &&
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
        />}
      </header>
    </div>
  );
}

export default App;
