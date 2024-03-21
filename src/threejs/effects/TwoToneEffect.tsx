import {Effect} from 'postprocessing';
import {forwardRef, useMemo} from 'react';
import {ColorRepresentation, Uniform, Color} from 'three';

const fragmentCode = /* glsl */ `
  uniform vec3 color_1;
  uniform vec3 color_2;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
      float lum = dot(inputColor.rgb, vec3(0.2126, 0.7152, 0.722));
      outputColor = vec4(mix(color_1, color_2, lum), 1);
  }
`;

class TwoToneEffectImpl extends Effect {
  constructor(color1: ColorRepresentation, color2: ColorRepresentation) {
    super('TwoToneEffect', fragmentCode, {
      uniforms: new Map([
        ['color_1', new Uniform(new Color(color1))],
        ['color_2', new Uniform(new Color(color2))],
      ]),
    });
  }
}

// eslint-disable-next-line react/display-name
export const TwoToneEffect = forwardRef(
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
      () => new TwoToneEffectImpl(color1, color2),
      [color1, color2],
    );
    return <primitive ref={ref} object={effect} dispose={null} />;
  },
);
