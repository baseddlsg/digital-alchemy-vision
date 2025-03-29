
import React, { useRef, useEffect } from 'react';

const FluidBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const gl = canvas.getContext('webgl') as WebGLRenderingContext;
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) return;
    
    gl.shaderSource(vertexShader, `
      attribute vec2 a_position;
      
      void main() {
        gl_Position = vec4(a_position, 0, 1);
      }
    `);
    gl.compileShader(vertexShader);
    
    // Fragment shader for cosmic fluid effect
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) return;
    
    gl.shaderSource(fragmentShader, `
      precision mediump float;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      
      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
      
      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,  
                            0.366025403784439,
                            -0.577350269189626,
                            0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                         + i.x + vec3(0.0, i1.x, 1.0 ));
                         
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }
      
      void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        st.x *= u_resolution.x/u_resolution.y;
        
        // Slow movement
        float time = u_time * 0.05;
        
        // Multiple layers of noise for depth
        float noise1 = snoise(st * 1.5 + vec2(time * 0.2, time * 0.1));
        float noise2 = snoise(st * 3.0 + vec2(time * -0.1, time * 0.3));
        float noise3 = snoise(st * 5.0 + vec2(time * -0.2, time * -0.2));
        
        float combinedNoise = (noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2) * 0.5 + 0.5;
        
        // Deep blues and purples
        vec3 color1 = vec3(0.05, 0.05, 0.1); // Very dark blue
        vec3 color2 = vec3(0.1, 0.05, 0.2);  // Dark purple
        vec3 color3 = vec3(0.02, 0.02, 0.08); // Nearly black
        
        // Mix colors based on noise
        vec3 color = mix(color3, mix(color1, color2, combinedNoise), combinedNoise);
        
        // Add subtle highlights
        float highlight = pow(combinedNoise, 4.0) * 0.2;
        color += vec3(highlight * 0.4, highlight * 0.2, highlight * 0.6);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `);
    gl.compileShader(fragmentShader);
    
    // Check for shader compilation errors
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error('Vertex shader compilation failed:', gl.getShaderInfoLog(vertexShader));
      return;
    }
    
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Fragment shader compilation failed:', gl.getShaderInfoLog(fragmentShader));
      return;
    }
    
    // Create program
    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking failed:', gl.getProgramInfoLog(program));
      return;
    }
    
    // Set up position attribute
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    // Two triangles covering the entire canvas
    const positions = [
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    
    // Get uniform locations
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    
    // Animation loop
    let startTime = Date.now();
    let frameId: number;
    
    const render = () => {
      const time = (Date.now() - startTime) / 1000;
      
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      
      gl.useProgram(program);
      gl.uniform1f(timeLocation, time);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      
      frameId = requestAnimationFrame(render);
    };
    
    render();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(frameId);
      
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-10"
    />
  );
};

export default FluidBackground;
