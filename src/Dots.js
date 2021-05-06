//  Triangulation sets of three
export const TRIANGULATION = [
    [0, 0, 0],
    [52,
    65,
  222,
  52,
  223,
  222,
  223,
  222,
  28,
  222,
  28,
  56,
  222,
  221,
  56,
  222,
  65,
  55,
  221,
  55,
  193,
  221,
  189,
  193,
  56,
  189,
  190,
  190,
  243,
  244,
  189,
  244,
  245,
  ],[
  124,
  113,
  130,
  124,
  46,
  113,
  113,
  130,
  247,
  46,
  225,
  113,
  225,
  247,
  30,
  46,
  225,
  53,
  53,
  225,
  224,
  224,
  29,
  30,
  53,
  224,
  223,
  223,
  29,
  27,
  223,
  28,
  27,
  247,
  246,
  30,
  246,
  30,
  161,
  30,
  161,
  160,
  29,
  160,
  159,
  27,
  159,
  158,
  27,
  28,
  158,
  ],
  ];

  
  // Drawing Mesh
  export const drawDots = (predictions, ctx, draw, showCanvas) => {
    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const keypoints = prediction.scaledMesh;
  
        // Draw Dots
        if (showCanvas === true) {
          for (let i = 0; i < keypoints.length; i++) {
            const x = keypoints[i][0];
            const y = keypoints[i][1];
  
            ctx.beginPath();
            ctx.arc(x, y, 1 /* radius */, 0, 3 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
          }
        }
      });
    }
  };
  