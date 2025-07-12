import {Effect} from 'postprocessing';
import {forwardRef, useMemo} from 'react';
import {ColorRepresentation, Uniform, Color} from 'three';
import SHADER_CODE from './glsl/TwoToneEffect.glsl';

class TwoToneEffectImpl extends Effect {
  constructor(color1: ColorRepresentation, color2: ColorRepresentation) {
    super('TwoToneEffect', SHADER_CODE, {
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
