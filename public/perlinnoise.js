function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  
  function interpolate(numList) {
      let numListCopy = [];
      let minNum;
      let maxNum
      for (let i = 0; i < numList.length; i++) {
        minNum = numList[i];
        if (i + 1 != numList.length) {
          maxNum = numList[i + 1];
        } else {
          maxNum = numList[0];
        }
        numListCopy.push(minNum);
        numListCopy.push((minNum + maxNum) / 2);
      }
      return numListCopy;
  }
  
  function perlinNoise2d(iterations, noise) {
    let values = [];
    for (let x = 0; x < noise; x++) {
      values.push(0);
    }
    let rCeil = 1;
    for (let i = 0; i < iterations; i++) {
      for (let a = 0; a < values.length; a++) {
        values[a] = values[a] + ((Math.random(rCeil) * Math.round(Math.random()) * 2 - 1
  ) * 0.5);
      }
      values = interpolate(values);
      rCeil = Math.trunc(rCeil / 2);
    }
    return values
  }
  
  
  
  function setup() {
    console.log();
    createCanvas(400, 400);
  }
  
  function draw() {
    let xValues = perlinNoise2d(3, 10);
    for (let i = 0; i < xValues.length; i++) {
      ellipse(xValues[i] * 5, 200, 24, 24)
    }
    background(51);
  }