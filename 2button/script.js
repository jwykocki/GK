// https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language


const vertexShaderTxt = `
    precision mediump float;

    attribute vec2 vertPosition;

    void main()
    {
        gl_Position = vec4(vertPosition, 1.0, 1.0);
    }

`
//initial
var fragmentShaderTxt = `
    void main()
    {
        gl_FragColor = vec4(0.9, 0.5, 1.0, 4.0); // R,G,B, opacity
    }
`


let Triangle = function () {
    
    console.log("Triangle()");
    let canvas = document.getElementById('main-canvas');
    let gl = canvas.getContext('webgl');

    if (!gl) {
        alert('webgl not supported');
    }

    gl.clearColor(0.5, 0.5, 1.0, 1.0);  // R,G,B, opacity
    gl.clear(gl.COLOR_BUFFER_BIT);

    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderTxt);
    gl.shaderSource(fragmentShader, fragmentShaderTxt);
    //gl.uniform4f(fragmentShader, 0.0, 0.0, 1.0, 1.0);

    
    gl.compileShader(vertexShader);
    // shaderCompileErr(vertexShader);
    gl.compileShader(fragmentShader);
    // shaderCompileErr(fragmentShader);

    
    let program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.detachShader(program, vertexShader); //https://www.khronos.org/opengl/wiki/Shader_Compilation#Before_linking
    gl.detachShader(program, fragmentShader);

    gl.validateProgram(program);
    // -1.0 do 1.0

    let triangleVert = [
        // X, Y         this gets more complicated the longer it goes on
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5,
    ]

   

    const triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVert), gl.STATIC_DRAW); // since everything in JS is 64 bit floating point we need to convert to 32 bits

    const posAttrLocation = gl.getAttribLocation(program, 'vertPosition');
    // const colorAttrLocation = gl.getAttribLocation(program, 'vertColor');

    gl.vertexAttribPointer(
        posAttrLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0,
    );


    gl.enableVertexAttribArray(posAttrLocation);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLES, 0, 6);


}

let button = document.getElementById("button");
button.addEventListener("click", changeColorAndDraw);

function changeColorAndDraw(){
    let a = Math.random();
    let b = Math.random();
    let c = Math.random();

    fragmentShaderTxt = `
    void main()
    {
        gl_FragColor = vec4(` + a + `,` +  b + `,` + c + `,` + 1.0 + `); // R,G,B, opacity
    }
    `

    Triangle();
}







