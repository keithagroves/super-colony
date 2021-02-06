import * as PIXI from "pixi.js";
import { Emitter, EmitterConfig } from "pixi-particles";

import { CustomPIXIComponent } from "react-pixi-fiber";

interface ParticleEmitterProps {
  x: number;
  y: number;
  images: string[];
  config: EmitterConfig;
  zIndex: number;
  playOnce?: boolean;
  configOverrides?: Partial<EmitterConfig>;
}

class ParticleEmitterImpl extends PIXI.Container {
  emitter?: Emitter;
  cancelled: boolean = false;
  raf?: ReturnType<typeof requestAnimationFrame>;
}

const propsEqual = (
  p1: ParticleEmitterProps,
  p2: ParticleEmitterProps
): boolean => {
  if (p1.x !== p2.x) {
    return false;
  }
  if (p1.y !== p2.y) {
    return false;
  }

  return true;
};

export const ParticleEmitter = CustomPIXIComponent<
  ParticleEmitterImpl,
  ParticleEmitterProps
>(
  {
    customDisplayObject: (_) => new ParticleEmitterImpl(),
    customApplyProps: (instance, oldProps, newProps) => {
      const { images, config, configOverrides, playOnce } = newProps;

      if (!instance.emitter) {
        const imageTextures = images.map((i) => PIXI.Texture.from(i));
        instance.emitter = new Emitter(
          instance,
          imageTextures,
          Object.assign({}, config, configOverrides || {})
        );
        let elapsed = Date.now();

        const t = () => {
          if (instance.cancelled) {
            instance.emitter?.cleanup();
            return;
          }
          const now = Date.now();
          if (instance.emitter) {
            try {
              instance.emitter.update((now - elapsed) * 0.001);
            } catch (e) {
              console.error(e);
              instance.cancelled = true;
            }
            // if (instance.emitter.emit) {
            //   instance.emitter.update((now - elapsed) * 0.001);
            // }
            //instance.cancelled = true;
          } else {
          }
          elapsed = now;
          instance.raf = requestAnimationFrame(t);
        };

        instance.emitter.emit = true;
        if (playOnce) {
          instance.emitter.playOnce();
          instance.emitter.autoUpdate = false;
        }
        t();
      }

      if (!propsEqual(oldProps, newProps)) {
        instance.emitter.updateSpawnPos(newProps.x, newProps.y);
        instance.zIndex = newProps.zIndex;
      }
    },
    customWillDetach: (instance) => {
      instance.cancelled = true;
      if (instance.emitter) {
        //instance.emitter.stop = true;
        instance.emitter.emit = false;
        instance.emitter.destroy();
        instance.emitter.cleanup();
      }
      if (instance.raf) {
        cancelAnimationFrame(instance.raf);
      }
    },
  },
  "ParticleEmitter"
);
