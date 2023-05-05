const vertexShaderTxt = `
precision mediump float;

attribute vec2 vertPosition;

void main()
{
    gl_Position = vec4(vertPosition, 0.0, 1.0);
}

`
const fragmentShaderTxt = `
void main()
{
    gl_FragColor = vec4(0.5, 0.0, 0.7, 1.0); // R,G,B, opacity
}
`

 let Hexagon = function () {

    let canvas = document.getElementById('main-canvas');
    let gl = canvas.getContext('webgl');

    if (!gl) {
        alert('webgl not supported');
    }

    gl.clearColor(0.5, 0.5, 0.9, 1.0);  // R,G,B, opacity
    gl.clear(gl.COLOR_BUFFER_BIT);

    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderTxt);
    gl.shaderSource(fragmentShader, fragmentShaderTxt);

    
    gl.compileShader(vertexShader);

    gl.compileShader(fragmentShader);
   

    let program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.detachShader(program, vertexShader); 
    gl.detachShader(program, fragmentShader);

    gl.validateProgram(program);

    let aspect = canvas.width / canvas.height;

    let x = 0;
    let y = 0;
    let r = 0.2;
    let yy = r * Math.sqrt(3) / 2;

    let hexagonVertices = [
        x,              y * aspect,     1, 1, 1,
        x + (r / 2),    yy * aspect,    1, 1, 1,
        x + r,          y * aspect,     1, 1, 1,
        x + (r / 2),    -yy * aspect,   1, 1, 1,
        x - (r / 2),    -yy * aspect,   1, 1, 1,
        x - r,          y * aspect,     1, 1, 1,
        x - (r / 2),    yy * aspect,    1, 1, 1,
        x + (r / 2),    yy * aspect,    1, 1, 1,
    ];

    const hexagonVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, hexagonVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(hexagonVertices), gl.STATIC_DRAW);

    const posAttrLocation2 = gl.getAttribLocation(program, 'vertPosition');

    gl.vertexAttribPointer(
        posAttrLocation2,
        2,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0,
    );

    gl.enableVertexAttribArray(posAttrLocation2);
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);
} 

