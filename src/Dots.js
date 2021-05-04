//  Triangulation sets of three
export const TRIANGULATION = [
    [0, 0, 0],[52,
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
  
  // Triangle drawing method
  const drawPath = (ctx, points, closePath) => {
    const region = new Path2D();
    region.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
      const point = points[i];
      region.lineTo(point[0], point[1]);
    }
  
    if (closePath) {
      region.closePath();
    }
    ctx.strokeStyle = "red";
    ctx.stroke(region);
  };
  
  // Drawing Mesh
  export const drawDots = (predictions, ctx, key, dots) => {
    if (predictions.length > 0) {
      predictions.forEach((prediction) => {
        const keypoints = prediction.scaledMesh;
  
        //  Draw Triangles
        // console.log(TRIANGULATION[key]);
        for (let i = 0; i < TRIANGULATION[key].length / 3; i++) {
          // Get sets of three keypoints for the triangle
          const points = [
            TRIANGULATION[key][i * 3],
            TRIANGULATION[key][i * 3 + 1],
            TRIANGULATION[key][i * 3 + 2],
          ].map((index) => keypoints[index]);
        }
  
        // Draw Dots
          for (let i = 0; i < keypoints.length; i++) {
            const x = keypoints[i][0];
            const y = keypoints[i][1];
  
            ctx.beginPath();
            ctx.arc(x, y, 1 /* radius */, 0, 3 * Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
          }
      });
    }
  };
  