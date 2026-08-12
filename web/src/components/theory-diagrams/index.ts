import type { ComponentType } from "react";
import { KramersDiagram } from "./KramersDiagram";
import { SirDiagram } from "./SirDiagram";
import { HawkesDiagram } from "./HawkesDiagram";
import { ParetoDiagram } from "./ParetoDiagram";

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
};

export { DiagramBadge } from "./DiagramBadge";
