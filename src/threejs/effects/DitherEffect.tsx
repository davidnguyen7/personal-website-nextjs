import {Effect} from 'postprocessing';
import {forwardRef, useMemo} from 'react';
import {Color, ColorRepresentation, Uniform} from 'three';

const fragmentCode = /* glsl */ `
    #define pixel_per_pixels 2.

    uniform vec3 color_1;
    uniform vec3 color_2;

    const mat4 ditherMatrix = mat4(
      vec4(0.0, 0.75, 0.1875, 0.9375),
      vec4(0.5, 0.25, 0.6875, 0.4375),
      vec4(0.125, 0.875, 0.0625, 0.8125),
      vec4(0.625, 0.375, 0.5625, 0.3125)
    );

    void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
      vec2 coord = floor(uv * resolution);
      vec2 pixelcoord = coord - mod(coord, pixel_per_pixels);

      vec3 col = texture(inputBuffer,pixelcoord/resolution).rgb;
      float lum = dot(col, vec3(0.2126, 0.7152, 0.722));

      float bayerLum = ditherMatrix
        [int(mod(mod(pixelcoord.x, pixel_per_pixels*4.)/pixel_per_pixels, 4.))]
        [int(mod(mod(pixelcoord.y, pixel_per_pixels*4.)/pixel_per_pixels, 4.))];

      float threshold = clamp((bayerLum - lum)/0.4, 0., 1.);

      vec3 chosen_color = lum > bayerLum ? color_1 : mix(color_1, color_2, (threshold >= lum ? 1. : threshold));
      outputColor = vec4(chosen_color, 1.);
    }
`;

export class DitherEffectImpl extends Effect {
  constructor(color1: ColorRepresentation, color2: ColorRepresentation) {
    super('DitherEffect', fragmentCode, {
      uniforms: new Map([
        ['color_1', new Uniform(new Color(color1))],
        ['color_2', new Uniform(new Color(color2))],
      ]),
    });
  }
}
// eslint-disable-next-line react/display-name
export const DitherEffect = forwardRef(
  (
    {
      color1,
      color2,
    }: {
      color1: ColorRepresentation;
      color2: ColorRepresentation;
    },
    ref,
  ) => {
    const effect = useMemo(
      () => new DitherEffectImpl(color1, color2),
      [color1, color2],
    );
    return <primitive ref={ref} object={effect} dispose={null} />;
  },
);
