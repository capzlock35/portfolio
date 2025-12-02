// Fragment shader code for pixelated background effect with postprocessing
precision mediump float;

uniform sampler2D uTexture;
varying vec2 vUv;

void main() {
    vec2 pixelSize = vec2(1.0 / 256.0, 1.0 / 256.0); // Adjust pixel size based on desired pixelation
    vec2 uv = floor(vUv / pixelSize) * pixelSize; // Pixelate effect
    gl_FragColor = texture2D(uTexture, uv); // Sample texture
}