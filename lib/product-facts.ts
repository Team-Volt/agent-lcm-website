import raw from "./product-facts.json";

export type ImportPolicy = "supported" | "none";

export type Harness = {
  id: string;
  label: string;
  badge: string;
  sampleSessionId: string;
  setupCommand: string;
  importPolicy: ImportPolicy;
  importNote?: string;
};

export type ProductFacts = {
  name: string;
  github: string;
  npmPackage: string;
  nodeRequirement: string;
  storePath: string;
  installCommands: readonly string[];
  pluginSetupHash: string;
  installReadyTitle: string;
  pluginNextStep: string;
  harnesses: readonly Harness[];
};

function parseImportPolicy(value: string): ImportPolicy {
  if (value === "supported" || value === "none") {
    return value;
  }
  throw new Error(`unknown importPolicy: ${value}`);
}

function parseHarness(row: (typeof raw.harnesses)[number]): Harness {
  const setupCommand = `agent-lcm setup ${row.id}`;
  if (row.setupCommand !== setupCommand) {
    throw new Error(`${row.id} setupCommand must be ${setupCommand}`);
  }
  const importPolicy = parseImportPolicy(row.importPolicy);
  const importNote = "importNote" in row ? row.importNote : undefined;
  if (importNote && importPolicy !== "supported") {
    throw new Error(`${row.id} importNote requires importPolicy supported`);
  }
  return {
    id: row.id,
    label: row.label,
    badge: row.badge,
    sampleSessionId: row.sampleSessionId,
    setupCommand,
    importPolicy,
    ...(importNote ? { importNote } : {}),
  };
}

export const PRODUCT: ProductFacts = {
  name: raw.name,
  github: raw.github,
  npmPackage: raw.npmPackage,
  nodeRequirement: raw.nodeRequirement,
  storePath: raw.storePath,
  installCommands: raw.installCommands,
  pluginSetupHash: raw.pluginSetupHash,
  installReadyTitle: raw.installReadyTitle,
  pluginNextStep: raw.pluginNextStep,
  harnesses: raw.harnesses.map(parseHarness),
};

export function joinLabels(labels: readonly string[]): string {
  if (labels.length === 0) {
    return "";
  }
  if (labels.length === 1) {
    return labels[0];
  }
  return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
}

export function pluginSetupUrl(): string {
  return `${PRODUCT.github}${PRODUCT.pluginSetupHash}`;
}
