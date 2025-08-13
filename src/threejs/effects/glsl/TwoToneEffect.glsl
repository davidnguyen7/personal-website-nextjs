uniform vec3 color_1;
uniform vec3 color_2;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  float lum = dot(inputColor.rgb, vec3(0.2126, 0.7152, 0.722));
  outputColor = vec4(mix(color_1, color_2, lum), 1);
}