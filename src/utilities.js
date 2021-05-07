import data from './data/makeup_refs.json'
//  Triangulation sets of three

console.log(data);
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
// [

// ],
];

const get_xyz = (ref, keypoints) => {
  //console.log(keypoints[ref[3]], ref[0])
  var xyz = [ref[0]*keypoints[ref[3]][0] + ref[1]*keypoints[ref[4]][0] + ref[2]*keypoints[ref[5]][0],
  ref[0]*keypoints[ref[3]][1] + ref[1]*keypoints[ref[4]][1] + ref[2]*keypoints[ref[5]][1], 
  ref[0]*keypoints[ref[3]][2] + ref[1]*keypoints[ref[4]][2] + ref[2]*keypoints[ref[5]][2]]

  return xyz
}


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
export const drawTri = (predictions, ctx, key, dots) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const keypoints = prediction.scaledMesh;

      //  Draw Triangles
      /*
      // console.log(TRIANGULATION[key]);
      for (let i = 0; i < TRIANGULATION[key].length / 3; i++) {
        // Get sets of three keypoints for the triangle
        const points = [
          TRIANGULATION[key][i * 3],
          TRIANGULATION[key][i * 3 + 1],
          TRIANGULATION[key][i * 3 + 2],
        ].map((index) => keypoints[index]);
        //  Draw triangle
        // drawPath(ctx, points, true);
        drawPath(ctx, points, false);
      }*/
      if (key<11 && key>-1){
    const step = data.steps[key]
      var points = []
      for (let j = 0; j < step.length; j++){
        var xyz = get_xyz(step[j], keypoints)
        points.push(xyz)
        
      }
      console.log(points);
      drawPath(ctx, points,false);
      }else{return null}}
    );
  }
};
