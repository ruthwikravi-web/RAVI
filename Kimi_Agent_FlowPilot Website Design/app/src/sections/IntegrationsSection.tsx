import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// DNA Helix Curve
class HelixCurve extends THREE.Curve<THREE.Vector3> {
  turns: number;
  height: number;
  radius: number;
  phase: number;

  constructor(turns: number, height: number, radius: number, phase: number) {
    super();
    this.turns = turns;
    this.height = height;
    this.radius = radius;
    this.phase = phase;
  }

  getPoint(t: number): THREE.Vector3 {
    const angle = t * Math.PI * 2 * this.turns + this.phase;
    const x = Math.cos(angle) * this.radius;
    const z = Math.sin(angle) * this.radius;
    const y = (t - 0.5) * this.height;
    return new THREE.Vector3(x, y, z);
  }
}

function HelixScene() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.InstancedMesh>(null);
  const particles2Ref = useRef<THREE.InstancedMesh>(null);

  const { curve1, curve2, particleData } = useMemo(() => {
    const strand1Points = new HelixCurve(6, 12, 3, 0).getPoints(200);
    const strand2Points = new HelixCurve(6, 12, 3, Math.PI).getPoints(200);
    const c1 = new THREE.CatmullRomCurve3(strand1Points);
    const c2 = new THREE.CatmullRomCurve3(strand2Points);

    const pData = [];
    for (let i = 0; i < 60; i++) {
      pData.push({
        t: i / 60,
        speed: 0.0003 + Math.random() * 0.0005,
        curve: i % 2 === 0 ? c1 : c2,
        index: i,
        side: i % 2,
      });
    }

    return { curve1: c1, curve2: c2, particleData: pData };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Create tube geometry for the helix strands
  const tubeGeo1 = useMemo(() => {
    return new THREE.TubeGeometry(curve1, 200, 0.06, 8, false);
  }, [curve1]);

  const tubeGeo2 = useMemo(() => {
    return new THREE.TubeGeometry(curve2, 200, 0.06, 8, false);
  }, [curve2]);

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.12, 12, 12), []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }

    // Animate particles
    [particlesRef, particles2Ref].forEach((ref, side) => {
      if (!ref.current) return;
      const sideParticles = particleData.filter((p) => p.side === side);
      sideParticles.forEach((p) => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const pos = p.curve.getPointAt(p.t);
        dummy.position.copy(pos);
        dummy.updateMatrix();
        ref.current!.setMatrixAt(p.index, dummy.matrix);
      });
      ref.current.instanceMatrix.needsUpdate = true;
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Strand 1 */}
      <mesh geometry={tubeGeo1}>
        <meshBasicMaterial color="#E84545" transparent opacity={0.8} />
      </mesh>
      {/* Strand 2 */}
      <mesh geometry={tubeGeo2}>
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.5} />
      </mesh>
      {/* Particles strand 1 */}
      <instancedMesh ref={particlesRef} args={[sphereGeo, undefined, 60]}>
        <meshBasicMaterial color="#E84545" transparent opacity={0.9} />
      </instancedMesh>
      {/* Particles strand 2 */}
      <instancedMesh ref={particles2Ref} args={[sphereGeo, undefined, 60]}>
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.7} />
      </instancedMesh>
    </group>
  );
}

const integrations = [
  "Slack", "Gmail", "HubSpot", "Salesforce",
  "Notion", "Jira", "Airtable", "Zapier",
  "GitHub", "Stripe", "Twilio", "Zendesk",
];

export default function IntegrationsSection() {
  return (
    <section className="relative min-h-[800px] bg-[#0A0A0A] overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 18], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <HelixScene />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-md">
          <span className="text-xs font-mono text-[#E84545] tracking-wider uppercase mb-4 block">
            Integrations
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Connect Your Stack.
          </h2>
          <p className="text-lg text-white/60 leading-relaxed mb-8">
            Native integrations with 150+ enterprise tools. If it has an API,
            FlowPilot can orchestrate it.
          </p>

          {/* Integration Pills */}
          <div className="flex flex-wrap gap-2">
            {integrations.map((name) => (
              <span
                key={name}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/10 text-white/70 border border-white/10"
              >
                {name}
              </span>
            ))}
            <span className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#E84545]/20 text-[#E84545] border border-[#E84545]/20">
              +138 more
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
