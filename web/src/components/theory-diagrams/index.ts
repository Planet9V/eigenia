import type { ComponentType } from "react";
import { KramersDiagram } from "./KramersDiagram";
import { SirDiagram } from "./SirDiagram";
import { HawkesDiagram } from "./HawkesDiagram";
import { ParetoDiagram } from "./ParetoDiagram";
import { GgnnDiagram } from "./GgnnDiagram";
import { L0L1Diagram } from "./L0L1Diagram";
import { LacanDiagram } from "./LacanDiagram";
import { IsingDiagram } from "./IsingDiagram";
import { ClaytonDiagram } from "./ClaytonDiagram";

export interface TheoryDiagramEntry {
  Diagram: ComponentType;
  badgeLine1: string;
  badgeLine2: string;
}

export const THEORY_DIAGRAMS: Record<string, TheoryDiagramEntry> = {
  "kramers-barrier-escape": {
    Diagram: KramersDiagram,
    badgeLine1: "KRAMERS-05 · ΔE barrier",
    badgeLine2: "MTTC = 1/k · escape rate",
  },
  "sir-compartmental-model": {
    Diagram: SirDiagram,
    badgeLine1: "SIR-06 · contagion flow",
    badgeLine2: "R₀ = βS₀/γ",
  },
  "hawkes-self-exciting-process": {
    Diagram: HawkesDiagram,
    badgeLine1: "HAWKES-08 · self-excitation",
    badgeLine2: "λ(t) triggered cascade",
  },
  "pareto-pot-evt-model": {
    Diagram: ParetoDiagram,
    badgeLine1: "PARETO-09 · fat tail",
    badgeLine2: "EVT vs. Gaussian",
  },
  "aeon-ggnn-gated-graph": {
    Diagram: GgnnDiagram,
    badgeLine1: "GGNN-01 · directed graph",
    badgeLine2: "7-layer propagation",
  },
  "l0-l1-gap-calculus": {
    Diagram: L0L1Diagram,
    badgeLine1: "L0/L1-02 · KL divergence",
    badgeLine2: "design vs. live telemetry",
  },
  "mckenney-lacan-psychometric-tensor": {
    Diagram: LacanDiagram,
    badgeLine1: "LACAN-03 · RSI triad",
    badgeLine2: "adversary targeting",
  },
  "interaction-hamiltonian": {
    Diagram: IsingDiagram,
    badgeLine1: "ISING-04 · phase transition",
    badgeLine2: "culture order parameter",
  },
  "clayton-copula-actuarial": {
    Diagram: ClaytonDiagram,
    badgeLine1: "CLAYTON-07 · tail dependence",
    badgeLine2: "λL = 2⁻¹ᐟᶿ",
  },
};

export { DiagramBadge } from "./DiagramBadge";
