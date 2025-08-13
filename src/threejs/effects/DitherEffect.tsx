import {Effect} from 'postprocessing';
import {forwardRef, useMemo} from 'react';
import {Color, ColorRepresentation, Uniform} from 'three';
import SHADER_CODE from './glsl/DitherEffect.glsl';

class DitherEffectImpl extends Effect {
  constructor(color1: ColorRepresentation, color2: ColorRepresentation) {
    super('DitherEffect', SHADER_CODE, {
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
