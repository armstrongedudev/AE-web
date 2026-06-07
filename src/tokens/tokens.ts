/**
 * Token name maps (string references to the CSS custom properties in tokens.css).
 * Use in components as `var(${color.primary})` or read for docs/showcases.
 * Source of truth is tokens.css — keep these in sync with the Figma variables.
 */

export const color = {
  // brand
  primary: "--primary", primaryHover: "--primary-hover", onPrimary: "--on-primary",
  forest: "--forest", onForest: "--on-forest",
  mint: "--mint", onMint: "--on-mint",
  accent: "--accent", accentHover: "--accent-hover", onAccent: "--on-accent",
  accentSoft: "--accent-soft", onAccentSoft: "--on-accent-soft",
  cta: "--cta", onCta: "--on-cta",
  // surfaces
  background: "--background", surfaceCard: "--surface-card",
  surfaceCream: "--surface-cream", surfaceMint: "--surface-mint", surfacePeach: "--surface-peach",
  muted: "--muted",
  // text
  ink: "--ink", body: "--body", mutedForeground: "--muted-foreground",
  // borders / focus
  hairline: "--hairline", hairlineStrong: "--hairline-strong", ring: "--ring",
  // state
  star: "--star",
  success: "--success", successSoft: "--success-soft",
  warning: "--warning", warningSoft: "--warning-soft",
  error: "--error", errorSoft: "--error-soft",
  info: "--info", infoSoft: "--info-soft",
  destructive: "--destructive",
} as const;

export const space = {
  0: "--space-0", 0.5: "--space-0-5", 1: "--space-1", 1.5: "--space-1-5",
  2: "--space-2", 2.5: "--space-2-5", 3: "--space-3", 3.5: "--space-3-5",
  4: "--space-4", 5: "--space-5", 6: "--space-6", 7: "--space-7", 8: "--space-8",
  9: "--space-9", 10: "--space-10", 11: "--space-11", 12: "--space-12",
  14: "--space-14", 16: "--space-16", 20: "--space-20", 22: "--space-22",
  24: "--space-24", 30: "--space-30",
} as const;

export const radius = {
  none: "--radius-none", sm: "--radius-sm", md: "--radius-md",
  lg: "--radius-lg", xl: "--radius-xl", "2xl": "--radius-2xl", full: "--radius-full",
} as const;

/** Semantic intents */
export const semanticSpace = {
  insetSm: "--space-inset-sm", insetMd: "--space-inset-md", insetLg: "--space-inset-lg",
  gapSm: "--space-gap-sm", gapMd: "--space-gap-md", stack: "--space-stack", section: "--space-section",
} as const;

export const semanticRadius = {
  control: "--radius-control", card: "--radius-card", modal: "--radius-modal", pill: "--radius-pill",
} as const;

export const v = (token: string) => `var(${token})`;

export const breakpoints = { phone: 639, tablet: 1023, desktop: 1024 } as const;
