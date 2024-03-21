import {Effect} from 'postprocessing';
import {forwardRef, useMemo} from 'react';

const fragmentCode = /* glsl */ `
    #define pixel_per_pixels 2.

    const vec4 COL_1 = vec4(1);
    const vec4 COL_2 = vec4(0, 0, 0, 1);

    const mat4 ditherMatrix = mat4(
      vec4(0.0, 0.75, 0.1875, 0.9375),
      vec4(0.5, 0.25, 0.6875, 0.4375),
      vec4(0.125, 0.875, 0.0625, 0.8125),
      vec4(0.625, 0.375, 0.5625, 0.3125)
    );

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
      vec2 coord = floor(uv * resolution);
      vec2 pixelcoord = coord - mod(coord, pixel_per_pixels);

      vec4 col = texture(inputBuffer,pixelcoord/resolution);
      float lum = dot(col.rgb, vec3(0.2126, 0.7152, 0.722));

      float bayerLum = ditherMatrix
        [int(mod(mod(pixelcoord.x, pixel_per_pixels*4.)/pixel_per_pixels, 4.))]
        [int(mod(mod(pixelcoord.y, pixel_per_pixels*4.)/pixel_per_pixels, 4.))];

      outputColor = lum > bayerLum ? COL_1 : COL_2;
    }
`;

export class DitherEffectImpl extends Effect {
  constructor() {
    super('DitherEffect', fragmentCode);
  }
}
// eslint-disable-next-line react/display-name
export const DitherEffect = forwardRef(({}, ref) => {
  const effect = useMemo(() => new DitherEffectImpl(), []);
  return <primitive ref={ref} object={effect} dispose={null} />;
});
