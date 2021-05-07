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
  export const drawMakeUp = (predictions, ctx, key, TRIANGULATION) => {
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
          //  Draw triangle
          drawPath(ctx, points, true);
        }
      });
    }
  };