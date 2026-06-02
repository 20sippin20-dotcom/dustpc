"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uProgress;
  varying vec2 vUv;

  float hash(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.1 + vec2(13.7, 87.2);
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // Mouse warp
    vec2 mouseOff = (uMouse - 0.5) * 0.08;
    uv += mouseOff * smoothstep(0.6, 0.0, length(uv - 0.5));

    // Domain warping — double FBM pass
    vec2 q = vec2(
      fbm(uv + uTime * 0.06),
      fbm(uv + vec2(5.2, 1.3) + uTime * 0.05)
    );
    vec2 r = vec2(
      fbm(uv + 3.0 * q + vec2(1.7, 9.2) + uTime * 0.04),
      fbm(uv + 3.0 * q + vec2(8.3, 2.8) - uTime * 0.03)
    );
    float f = fbm(uv + 3.5 * r);

    // Colors
    vec3 colBlack = vec3(0.04, 0.04, 0.04);
    vec3 colRedDark = vec3(0.6, 0.0, 0.0);
    vec3 colRed = vec3(1.0, 0.169, 0.169);

    vec3 color = mix(colBlack, colRedDark, clamp(f * f * 3.5, 0.0, 1.0));
    color = mix(color, colRed, clamp(length(q) * 0.8, 0.0, 1.0));

    // Alpha: progress drives coverage
    float alpha = smoothstep(0.25, 0.65, f + uProgress * 0.8 - 0.3) * 0.88;

    gl_FragColor = vec4(color, alpha);
  }
`;

function LiquidPlane({ progress }: { progress: number }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouseRef = useRef<[number, number]>([0.5, 0.5]);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uProgress: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(...mouseRef.current),
      0.05
    );
    materialRef.current.uniforms.uProgress.value +=
      (progress - materialRef.current.uniforms.uProgress.value) * 0.04;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function LiquidScene({ progress = 0 }: { progress?: number }) {
  return (
    <Canvas
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 1], fov: 75 }}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      <LiquidPlane progress={progress} />
    </Canvas>
  );
}
