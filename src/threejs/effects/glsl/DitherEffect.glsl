#define downscale_factor 2.

uniform vec3 color_1;
uniform vec3 color_2;

const mat4 dither_map = mat4(
  vec4(0.0, 0.75, 0.1875, 0.9375),
  vec4(0.5, 0.25, 0.6875, 0.4375),
  vec4(0.125, 0.875, 0.0625, 0.8125),
  vec4(0.625, 0.375, 0.5625, 0.3125)
);

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  vec2 coord = floor(uv * resolution);
  vec2 pixel_coord = coord - mod(coord, downscale_factor);

  vec3 col = texture(inputBuffer,pixel_coord/resolution).rgb;
  float lum = dot(col, vec3(0.2126, 0.7152, 0.722));

  float threshold = dither_map
    [int(mod(mod(pixel_coord.x, downscale_factor*4.)/downscale_factor, 4.))]
    [int(mod(mod(pixel_coord.y, downscale_factor*4.)/downscale_factor, 4.))];

  float difference = threshold - lum;
  float mix_amount = difference <= 0. ? 1. : clamp(difference/0.0625, 0., 1.);

  vec3 chosen_color = lum > threshold ? color_1 : mix(color_1, color_2, mix_amount);
  outputColor = vec4(chosen_color, 1.);
}