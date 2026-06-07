import type { ReactNode } from "react";
import {
  GraduationCap,
  Clock,
  BookOpen,
  Users,
  ChalkboardTeacher,
  Lightbulb,
  CalendarBlank,
  Certificate,
  ArrowRight,
} from "@phosphor-icons/react";
import {
  Button,
  ArrowLink,
  Chip,
  IconBadge,
  Eyebrow,
  Heading,
  Text,
  Stars,
  Avatar,
  Stat,
  Stepper,
  Icon,
  SectionHeader,
  OfferingCard,
  WorkshopCard,
  TestimonialCard,
  StatsStrip,
  Marquee,
  MethodsSection,
  Navbar,
  Footer,
} from "../index";
import { Example, PropsTable, Callout, Section, Labeled } from "./ui";

export interface DocEntry {
  id: string;
  group: "Basic" | "Macro";
  title: string;
  blurb: string;
  thumb: () => ReactNode;
  content: () => ReactNode;
}

/* =========================================================================
   BASIC COMPONENTS
   ========================================================================= */

const basic: DocEntry[] = [
  {
    id: "icon",
    group: "Basic",
    title: "Icon",
    blurb: "Phosphor icon wrapper with standardised size, weight and a11y.",
    thumb: () => <Icon name={GraduationCap} size={36} />,
    content: () => (
      <>
        <Section title="Overview">
          <Text size="lg">
            A thin wrapper around <code>@phosphor-icons/react</code> that standardises size and weight and handles
            accessibility — decorative by default (<code>aria-hidden</code>), labelled when meaningful.
          </Text>
        </Section>
        <Section title="Examples">
          <Example
            code={`import { GraduationCap } from "@phosphor-icons/react";\nimport { Icon } from "armstrong-ui";\n\n<Icon name={GraduationCap} size={28} />`}
          >
            <Labeled label="GraduationCap"><Icon name={GraduationCap} size={28} /></Labeled>
            <Labeled label="BookOpen"><Icon name={BookOpen} size={28} /></Labeled>
            <Labeled label="Users"><Icon name={Users} size={28} /></Labeled>
            <Labeled label="Lightbulb"><Icon name={Lightbulb} size={28} /></Labeled>
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "name", type: "PhosphorIcon", desc: "The Phosphor icon component to render." },
              { name: "size", type: "number", def: "20", desc: "Pixel size." },
              { name: "weight", type: "IconWeight", def: '"regular"', desc: "Phosphor weight." },
              { name: "color", type: "string", def: '"currentColor"', desc: "Any CSS color or token." },
              { name: "label", type: "string", desc: "Accessible label; omit to hide from assistive tech." },
            ]}
          />
        </Section>
        <Section title="Accessibility">
          <Callout>Decorative by default (<code>aria-hidden</code>). Pass <code>label</code> for meaningful icons to expose <code>role="img"</code> and an accessible name.</Callout>
        </Section>
      </>
    ),
  },
  {
    id: "button",
    group: "Basic",
    title: "Button",
    blurb: "Primary action control — variant × size, optional icons, link or button.",
    thumb: () => <Button size="sm">Get certified</Button>,
    content: () => (
      <>
        <Section title="Overview">
          <Text size="lg">
            The main action control. Renders an <code>&lt;a&gt;</code> when <code>href</code> is given, a{" "}
            <code>&lt;button&gt;</code> otherwise. Three variants, three sizes, optional leading/trailing icons.
          </Text>
        </Section>
        <Section title="Variants">
          <Example
            code={`<Button variant="primary">Book a training</Button>\n<Button variant="secondary">Meet Camille</Button>\n<Button variant="ghost">Learn more</Button>`}
          >
            <Button variant="primary">Book a training</Button>
            <Button variant="secondary">Meet Camille</Button>
            <Button variant="ghost">Learn more</Button>
          </Example>
        </Section>
        <Section title="Sizes & icons">
          <Example
            code={`<Button size="sm">Small</Button>\n<Button size="md" trailingIcon={ArrowRight}>Medium</Button>\n<Button size="lg" leadingIcon={GraduationCap}>Large</Button>`}
          >
            <Button size="sm">Small</Button>
            <Button size="md" trailingIcon={ArrowRight}>Medium</Button>
            <Button size="lg" leadingIcon={GraduationCap}>Large</Button>
          </Example>
        </Section>
        <Section title="System buttons (filled · elevated · rounded)">
          <Example
            code={`<Button variant="white" leadingIcon={ArrowRight} trailingIcon={ArrowRight}>Label</Button>\n<Button variant="cta" leadingIcon={ArrowRight} trailingIcon={ArrowRight}>Label</Button>\n<Button variant="forest" leadingIcon={ArrowRight} trailingIcon={ArrowRight}>Label</Button>`}
          >
            <Button variant="white" leadingIcon={ArrowRight} trailingIcon={ArrowRight}>Label</Button>
            <Button variant="cta" leadingIcon={ArrowRight} trailingIcon={ArrowRight}>Label</Button>
            <Button variant="forest" leadingIcon={ArrowRight} trailingIcon={ArrowRight}>Label</Button>
          </Example>
        </Section>
        <Section title="States">
          <Example
            code={`<Button variant="cta">Default</Button>\n<Button variant="cta" disabled>Disabled</Button>\n<Button variant="white" disabled>Disabled</Button>`}
          >
            <Labeled label="Default"><Button variant="cta">Default</Button></Labeled>
            <Labeled label="Disabled"><Button variant="cta" disabled>Disabled</Button></Labeled>
            <Labeled label="White · disabled"><Button variant="white" disabled>Disabled</Button></Labeled>
          </Example>
          <p style={{ marginTop: "var(--space-4)", color: "var(--muted-foreground)", fontFamily: "var(--font-inter)", fontSize: 14 }}>
            <strong>Hover</strong>, <code>:active</code> (press) and <code>:focus-visible</code> (keyboard ring) states are
            built in — hover or tab to the buttons above to see them.
          </p>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "variant", type: '"primary" | "secondary" | "ghost" | "white" | "cta" | "forest"', def: '"primary"', desc: "Visual style. white/cta/forest are the filled, elevated system buttons." },
              { name: "size", type: '"sm" | "md" | "lg"', def: '"md"', desc: "Control size." },
              { name: "leadingIcon", type: "PhosphorIcon", desc: "Icon before the label." },
              { name: "trailingIcon", type: "PhosphorIcon", desc: "Icon after the label." },
              { name: "fullWidth", type: "boolean", def: "false", desc: "Stretch to container width." },
              { name: "href", type: "string", desc: "Render as a link when present." },
            ]}
          />
        </Section>
        <Section title="Accessibility">
          <Callout>Keyboard-focusable with a visible <code>:focus-visible</code> ring (<code>--ring</code>). Disabled buttons set <code>aria-disabled</code> and drop pointer events. Links keep native anchor semantics.</Callout>
        </Section>
      </>
    ),
  },
  {
    id: "arrowlink",
    group: "Basic",
    title: "ArrowLink",
    blurb: "Inline text link with a trailing arrow — “Explore →”.",
    thumb: () => <ArrowLink>Explore</ArrowLink>,
    content: () => (
      <>
        <Section title="Overview">
          <Text size="lg">An inline call-to-action link in the brand green, with a trailing arrow. Underlines on hover.</Text>
        </Section>
        <Section title="Example">
          <Example code={`<ArrowLink href="/programs">Explore programs</ArrowLink>`}>
            <ArrowLink href="#">Explore programs</ArrowLink>
            <ArrowLink href="#">View all workshops</ArrowLink>
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "children", type: "ReactNode", desc: "Link label." },
              { name: "href", type: "string", desc: "Destination." },
              { name: "onClick", type: "() => void", desc: "Click handler." },
            ]}
          />
        </Section>
        <Section title="Accessibility">
          <Callout>Renders a real <code>&lt;a&gt;</code>/<code>&lt;button&gt;</code>; the arrow is decorative. Ensure a visible focus ring in context.</Callout>
        </Section>
      </>
    ),
  },
  {
    id: "chip",
    group: "Basic",
    title: "Chip",
    blurb: "Tag / pill / method-pill — tone × size, optional leading icon.",
    thumb: () => <Chip>Reggio Emilia</Chip>,
    content: () => (
      <>
        <Section title="Overview">
          <Text size="lg">A soft tonal label used for methods, categories and feature pills.</Text>
        </Section>
        <Section title="Tones & sizes">
          <Example
            code={`<Chip tone="mint">Reggio Emilia</Chip>\n<Chip tone="peach" icon={Clock}>2 hours</Chip>\n<Chip tone="outline" size="sm">Play-based</Chip>`}
          >
            <Chip tone="mint">Reggio Emilia</Chip>
            <Chip tone="peach" icon={Clock}>2 hours</Chip>
            <Chip tone="outline" size="sm">Play-based</Chip>
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "tone", type: '"mint" | "peach" | "outline"', def: '"mint"', desc: "Color tone." },
              { name: "size", type: '"sm" | "md"', def: '"md"', desc: "Size." },
              { name: "icon", type: "PhosphorIcon", desc: "Optional leading icon." },
            ]}
          />
        </Section>
        <Section title="Accessibility">
          <Callout>Chips are non-interactive labels. If you use them as filters, give them button semantics and a pressed state.</Callout>
        </Section>
      </>
    ),
  },
  {
    id: "iconbadge",
    group: "Basic",
    title: "IconBadge",
    blurb: "An icon in a soft rounded square — leads cards and offerings.",
    thumb: () => <IconBadge icon={GraduationCap} />,
    content: () => (
      <>
        <Section title="Tones">
          <Example
            code={`<IconBadge icon={GraduationCap} tone="mint" />\n<IconBadge icon={BookOpen} tone="peach" />\n<IconBadge icon={Users} tone="forest" />`}
          >
            <IconBadge icon={GraduationCap} tone="mint" />
            <IconBadge icon={BookOpen} tone="peach" />
            <IconBadge icon={Users} tone="forest" />
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "icon", type: "PhosphorIcon", desc: "Icon to render." },
              { name: "tone", type: '"mint" | "peach" | "forest"', def: '"mint"', desc: "Color tone." },
              { name: "size", type: "number", def: "48", desc: "Outer square size." },
              { name: "label", type: "string", desc: "Accessible label (else decorative)." },
            ]}
          />
        </Section>
        <Section title="Accessibility">
          <Callout>Decorative by default. If the badge conveys meaning, label it or label its parent.</Callout>
        </Section>
      </>
    ),
  },
  {
    id: "eyebrow",
    group: "Basic",
    title: "Eyebrow",
    blurb: "Small uppercase, wide-tracked label above section titles.",
    thumb: () => <Eyebrow>What I offer</Eyebrow>,
    content: () => (
      <>
        <Section title="Example">
          <Example code={`<Eyebrow>What I offer</Eyebrow>`}>
            <Eyebrow>What I offer</Eyebrow>
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable rows={[{ name: "children", type: "ReactNode", desc: "The label text." }]} />
        </Section>
        <Section title="Accessibility">
          <Callout>A decorative pretitle rendered as a <code>&lt;p&gt;</code> — it does not enter the heading outline.</Callout>
        </Section>
      </>
    ),
  },
  {
    id: "heading",
    group: "Basic",
    title: "Heading",
    blurb: "Display & H1–H4 type ramp using the Armstrong text styles.",
    thumb: () => <Heading level={3}>Aa</Heading>,
    content: () => (
      <>
        <Section title="Levels">
          <Example
            block
            code={`<Heading level="display">Where theory becomes practice</Heading>\n<Heading level={1}>Programs for teachers</Heading>\n<Heading level={2}>Workshops educators love</Heading>\n<Heading level={3}>After-school enrichment</Heading>\n<Heading level={4}>Observation & documentation</Heading>`}
          >
            <div style={{ display: "grid", gap: 14 }}>
              <Heading level="display">Where theory becomes practice</Heading>
              <Heading level={1}>Programs for teachers</Heading>
              <Heading level={2}>Workshops educators love</Heading>
              <Heading level={3}>After-school enrichment</Heading>
              <Heading level={4}>Observation &amp; documentation</Heading>
            </div>
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "level", type: '"display-xl" | "display" | 1 | 2 | 3 | 4', desc: "Type ramp step." },
              { name: "as", type: "ElementType", desc: "Override the rendered HTML tag." },
            ]}
          />
        </Section>
        <Section title="Accessibility">
          <Callout>Visual size is independent of the HTML tag — use <code>as</code> to keep a logical heading order on the page (don't skip levels for styling).</Callout>
        </Section>
      </>
    ),
  },
  {
    id: "text",
    group: "Basic",
    title: "Text",
    blurb: "Body copy — size (lg/md/sm/caption) × tone (ink/body/muted).",
    thumb: () => <Text>Aa body</Text>,
    content: () => (
      <>
        <Section title="Sizes & tones">
          <Example
            block
            code={`<Text size="lg" tone="ink">Large ink text</Text>\n<Text size="md" tone="body">Default body text</Text>\n<Text size="sm" tone="muted">Small muted text</Text>`}
          >
            <div style={{ display: "grid", gap: 8 }}>
              <Text size="lg" tone="ink">Reggio-inspired professional development.</Text>
              <Text size="md" tone="body">Helping early-childhood educators connect theory to practice.</Text>
              <Text size="sm" tone="muted">Georgia, North & South Carolina · DECAL-approved.</Text>
            </div>
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "size", type: '"lg" | "md" | "sm" | "caption"', def: '"md"', desc: "Type size." },
              { name: "tone", type: '"ink" | "body" | "muted"', def: '"body"', desc: "Text color role." },
              { name: "as", type: "ElementType", def: '"p"', desc: "Rendered tag." },
            ]}
          />
        </Section>
        <Section title="Accessibility">
          <Callout>Body tone on white meets WCAG AA. Reserve <code>muted</code> for secondary text — avoid it for essential small copy.</Callout>
        </Section>
      </>
    ),
  },
  {
    id: "stars",
    group: "Basic",
    title: "Stars",
    blurb: "Read-only rating row, 0–5 with halves.",
    thumb: () => <Stars value={4.5} size={22} />,
    content: () => (
      <>
        <Section title="Example">
          <Example block code={`<Stars value={5} />\n<Stars value={4.5} />\n<Stars value={3} />`}>
            <div style={{ display: "grid", gap: 8 }}>
              <Stars value={5} size={22} />
              <Stars value={4.5} size={22} />
              <Stars value={3} size={22} />
            </div>
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "value", type: "number", desc: "Rating 0–5 (supports halves)." },
              { name: "size", type: "number", def: "16", desc: "Pixel size of each star." },
            ]}
          />
        </Section>
        <Section title="Accessibility">
          <Callout>Exposes <code>role="img"</code> with a label like “4.5 out of 5 stars”; the individual stars are hidden from assistive tech.</Callout>
        </Section>
      </>
    ),
  },
  {
    id: "avatar",
    group: "Basic",
    title: "Avatar",
    blurb: "Circular image, or initials on a mint surface.",
    thumb: () => <Avatar name="Anna Camille" />,
    content: () => (
      <>
        <Section title="Example">
          <Example code={`<Avatar name="Anna Camille" />\n<Avatar name="Sarah Kling" size={40} />`}>
            <Avatar name="Anna Camille" />
            <Avatar name="Sarah Kling" size={40} />
            <Avatar name="Marcus Lee" size={72} />
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "name", type: "string", desc: "Used for alt text and the initials fallback." },
              { name: "src", type: "string", desc: "Image URL; falls back to initials." },
              { name: "size", type: "number", def: "56", desc: "Pixel diameter." },
            ]}
          />
        </Section>
        <Section title="Accessibility">
          <Callout>Images use <code>alt=name</code>; the initials fallback carries an <code>aria-label</code> of the name.</Callout>
        </Section>
      </>
    ),
  },
  {
    id: "stat",
    group: "Basic",
    title: "Stat",
    blurb: "A single credential / metric, optionally led by an icon badge.",
    thumb: () => <Stat icon={GraduationCap} value="30+" label="Years" />,
    content: () => (
      <>
        <Section title="Example">
          <Example
            code={`<Stat icon={GraduationCap} value="30+" label="Years of practice" />\n<Stat icon={ChalkboardTeacher} label="DECAL-Approved Trainer" />`}
          >
            <Stat icon={GraduationCap} value="30+" label="Years of practice" />
            <Stat icon={ChalkboardTeacher} label="DECAL-Approved Trainer" />
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "label", type: "ReactNode", desc: "Main label / credential." },
              { name: "value", type: "ReactNode", desc: "Optional emphasised value." },
              { name: "icon", type: "PhosphorIcon", desc: "Optional leading icon badge." },
            ]}
          />
        </Section>
        <Section title="Accessibility">
          <Callout>Value and label are read together — keep the label descriptive on its own.</Callout>
        </Section>
      </>
    ),
  },
  {
    id: "stepper",
    group: "Basic",
    title: "Stepper",
    blurb: "Numeric +/- control with clamped min/max and keyboard support.",
    thumb: () => <Stepper value={2} onChange={() => {}} />,
    content: () => (
      <>
        <Section title="Example">
          <Example
            code={`const [n, setN] = useState(2);\n<Stepper value={n} min={1} max={8} onChange={setN} label="Hours" />`}
          >
            <Stepper value={2} min={1} max={8} onChange={() => {}} label="Hours" />
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "value", type: "number", desc: "Current (controlled) value." },
              { name: "min", type: "number", def: "0", desc: "Minimum." },
              { name: "max", type: "number", desc: "Maximum." },
              { name: "step", type: "number", def: "1", desc: "Increment." },
              { name: "onChange", type: "(value: number) => void", desc: "Next clamped value." },
            ]}
          />
        </Section>
        <Section title="Accessibility">
          <Callout><code>role="group"</code> with an accessible label; each button is labelled Decrease/Increase; the value is <code>aria-live="polite"</code> and buttons disable at the limits.</Callout>
        </Section>
      </>
    ),
  },
];

/* =========================================================================
   MACRO COMPONENTS
   ========================================================================= */

const photos = ["#cfe8db", "#f3ddc0", "#d7e7f0", "#e7dcc2"].map((c, i) => (
  <div key={i} style={{ width: 220, height: 150, borderRadius: 14, background: c }} />
));

/** Portrait carousel cards for MethodsSection — proportion 280:460. */
const methodPhotos = ["#ffefd2", "#ecf7f1", "#cbeee0", "#ffefd2"].map((c, i) => (
  <div key={i} style={{ width: 280, height: 460, borderRadius: 24, background: c, flex: "none" }} />
));

const macro: DocEntry[] = [
  {
    id: "sectionheader",
    group: "Macro",
    title: "SectionHeader",
    blurb: "Eyebrow + title + optional subtitle, left- or center-aligned.",
    thumb: () => <SectionHeader eyebrow="What I offer" title="Programs" align="center" />,
    content: () => (
      <>
        <Section title="Example">
          <Example
            block
            code={`<SectionHeader\n  eyebrow="What I offer"\n  title="Programs for teachers & schools"\n  subtitle="Workshops and training to bring theory into everyday practice."\n  align="left"\n/>`}
          >
            <SectionHeader
              eyebrow="What I offer"
              title="Programs for teachers & schools"
              subtitle="Workshops and training to bring theory into everyday practice."
            />
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "eyebrow", type: "ReactNode", desc: "Optional uppercase eyebrow." },
              { name: "title", type: "ReactNode", desc: "Section title (H2)." },
              { name: "subtitle", type: "ReactNode", desc: "Optional supporting copy." },
              { name: "align", type: '"left" | "center"', def: '"left"', desc: "Alignment." },
            ]}
          />
        </Section>
      </>
    ),
  },
  {
    id: "offeringcard",
    group: "Macro",
    title: "OfferingCard",
    blurb: "Program card — icon badge, title, description, features, CTA.",
    thumb: () => <IconBadge icon={Lightbulb} tone="mint" />,
    content: () => (
      <>
        <Section title="Example">
          <Example
            block
            code={`<OfferingCard\n  icon={Lightbulb}\n  title="After-School Enrichment"\n  description="Hands-on Reggio-inspired sessions that extend classroom learning."\n  features={["Small-group ratios", "DECAL-aligned curriculum"]}\n  cta="Learn more"\n  ctaHref="/programs"\n/>`}
          >
            <div style={{ maxWidth: 360 }}>
              <OfferingCard
                icon={Lightbulb}
                title="After-School Enrichment"
                description="Hands-on Reggio-inspired sessions that extend classroom learning into the afternoon."
                features={["Small-group ratios", "DECAL-aligned curriculum", "Progress documentation"]}
                cta="Learn more"
                ctaHref="#"
              />
            </div>
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "icon", type: "PhosphorIcon", desc: "Leading badge icon." },
              { name: "title", type: "ReactNode", desc: "Program title." },
              { name: "description", type: "ReactNode", desc: "Short description." },
              { name: "features", type: "string[]", desc: "Optional bullet list." },
              { name: "cta / ctaHref", type: "ReactNode / string", desc: "Call to action." },
              { name: "tone", type: '"mint" | "peach" | "forest"', def: '"mint"', desc: "Badge tone." },
            ]}
          />
        </Section>
      </>
    ),
  },
  {
    id: "workshopcard",
    group: "Macro",
    title: "WorkshopCard",
    blurb: "Cover media with a duration tag, title, description and CTA.",
    thumb: () => <Chip tone="peach" size="sm" icon={Clock}>2 hours</Chip>,
    content: () => (
      <>
        <Section title="Example">
          <Example
            block
            code={`<WorkshopCard\n  tag="2h · in person"\n  title="Loose Parts"\n  description="Open-ended materials that turn any room into an inquiry-rich environment."\n  cta="Register"\n/>`}
          >
            <div style={{ maxWidth: 360 }}>
              <WorkshopCard
                tag="2h · in person"
                title="Loose Parts"
                description="Open-ended materials that turn any room into an inquiry-rich environment."
                cta="Register"
                ctaHref="#"
              />
            </div>
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "image", type: "string", desc: "Cover image; mint placeholder when absent." },
              { name: "tag", type: "ReactNode", desc: "Duration / category tag." },
              { name: "title", type: "ReactNode", desc: "Workshop title." },
              { name: "description", type: "ReactNode", desc: "Short description." },
              { name: "cta / ctaHref", type: "ReactNode / string", desc: "Call to action." },
            ]}
          />
        </Section>
      </>
    ),
  },
  {
    id: "testimonialcard",
    group: "Macro",
    title: "TestimonialCard",
    blurb: "Avatar, name, role, star rating and a quote.",
    thumb: () => <Stars value={5} size={20} />,
    content: () => (
      <>
        <Section title="Example">
          <Example
            block
            center={false}
            code={`<TestimonialCard\n  tone="mint"            // mint · rose · peach (placeholder color)\n  name="Maria T."\n  role="Lead Teacher · Atlanta"\n  rating={5}\n  quote="Knowledgeable and easy to understand…"\n/>`}
          >
            <div style={{ display: "grid", gap: 16, maxWidth: 640 }}>
              <TestimonialCard
                tone="mint"
                name="Maria T."
                role="Lead Teacher · Atlanta"
                rating={5}
                quote="Knowledgeable and easy to understand, with examples that relate to our day-to-day experiences with the kids."
              />
              <TestimonialCard
                tone="rose"
                name="Daniel R."
                role="Assistant Director · Savannah"
                rating={5}
                quote="Practical, warm and grounded in real classrooms. Our team left with things to try on Monday morning."
              />
              <TestimonialCard
                tone="peach"
                name="Amara K."
                role="Pre-K Lead · Macon"
                rating={5}
                quote="The best professional development we've done — close observation finally clicked for the whole team."
              />
            </div>
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "name", type: "string", desc: "Person's name." },
              { name: "role", type: "ReactNode", desc: "Role / organisation." },
              { name: "rating", type: "number", desc: "Rating 0–5." },
              { name: "quote", type: "ReactNode", desc: "The quote." },
              { name: "avatarSrc", type: "string", desc: "Optional avatar image (else a tinted initial)." },
              { name: "tone", type: '"mint" | "rose" | "peach"', def: '"mint"', desc: "Placeholder color when there's no image." },
            ]}
          />
        </Section>
      </>
    ),
  },
  {
    id: "statsstrip",
    group: "Macro",
    title: "StatsStrip",
    blurb: "A responsive row of credentials / metrics.",
    thumb: () => <Stat icon={GraduationCap} value="30+" label="Years" />,
    content: () => (
      <>
        <Section title="Example">
          <Example
            block
            center={false}
            code={`<StatsStrip items={[\n  { image: reggioSeal, value: "Reggio Emilia", label: "Approach · States served (GA, NC, SC)" },\n  { icon: Clock, value: "30+", label: "Years of practice" },\n  { icon: Certificate, value: "DECAL", label: "Approved Trainer" },\n  { icon: GraduationCap, value: "M.A.", label: "Educational Psychology" },\n]} />`}
          >
            <div style={{ background: "var(--surface-cream)", padding: "0 48px 14px", borderRadius: 16, minWidth: 1080 }}>
              <StatsStrip
                items={[
                  { image: "/brand/reggio-seal.png", value: "Reggio Emilia", label: "Approach · States served (GA, NC, SC)" },
                  { icon: Clock, value: "30+", label: "Years of practice" },
                  { icon: Certificate, value: "DECAL", label: "Approved Trainer" },
                  { icon: GraduationCap, value: "M.A.", label: "Educational Psychology" },
                ]}
              />
            </div>
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable rows={[{ name: "items", type: "StatsStripItem[]", desc: "Array of { label, value?, icon? }." }]} />
        </Section>
      </>
    ),
  },
  {
    id: "marquee",
    group: "Macro",
    title: "Marquee",
    blurb: "A real infinite, continuous loop of children (CSS).",
    thumb: () => <div style={{ display: "flex", gap: 6 }}>{photos.slice(0, 2).map((p, i) => <div key={i} style={{ width: 44, height: 30, borderRadius: 6, background: i ? "#f3ddc0" : "#cfe8db" }} />)}</div>,
    content: () => (
      <>
        <Section title="Example">
          <Example block center={false} code={`<Marquee speed={30} fade>\n  {photos.map((src) => <img src={src} />)}\n</Marquee>`}>
            <Marquee speed={24} fade>{photos}</Marquee>
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "speed", type: "number", def: "30", desc: "Seconds per loop (lower = faster)." },
              { name: "direction", type: '"left" | "right"', def: '"left"', desc: "Scroll direction." },
              { name: "fade", type: "boolean", def: "true", desc: "Edge fade mask." },
              { name: "gap", type: "number | string", def: "16", desc: "Gap between items." },
            ]}
          />
        </Section>
        <Section title="Accessibility">
          <Callout>The duplicate track is <code>aria-hidden</code>; motion pauses on hover and is disabled under <code>prefers-reduced-motion</code>.</Callout>
        </Section>
      </>
    ),
  },
  {
    id: "methodssection",
    group: "Macro",
    title: "MethodsSection",
    blurb: "Methods band — copy + method chips beside a photo Marquee.",
    thumb: () => <Chip tone="mint">Documentation</Chip>,
    content: () => (
      <>
        <Section title="Example">
          <Example
            block
            center={false}
            code={`<MethodsSection\n  eyebrow="Camille's philosophy"\n  title="Play is research. Observation is love."\n  body="It's the belief behind every training…"\n  methods={["Reggio Emilia", "Constructivism", "Social learning", …]}\n  credential="M.A. Educational Psychology · DECAL-Approved Trainer · 30+ years"\n  images={portraitPhotos}\n/>`}
          >
            <div className="section-bg--methods" style={{ padding: 48, borderRadius: 16, minWidth: 1120 }}>
              <MethodsSection
                eyebrow="Camille's philosophy"
                title="Play is research. Observation is love."
                body="It's the belief behind every training. A mother of two and a Georgia DECAL-approved trainer with an M.A. in Educational Psychology, Camille treats close observation as the foundation of respect for the child — and weaves Reggio Emilia, schemas, loose parts and multiple intelligences into practice teachers can use on Monday morning."
                methods={["Reggio Emilia", "Constructivism", "Social learning", "Play schemas", "Loose parts", "Multiple intelligences", "Emergent curriculum", "Documentation", "Reflective practice"]}
                credential="M.A. Educational Psychology · DECAL-Approved Trainer · 30+ years"
              >
                {methodPhotos}
              </MethodsSection>
            </div>
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "eyebrow", type: "ReactNode", desc: "Optional eyebrow." },
              { name: "title", type: "ReactNode", desc: "Section title." },
              { name: "body", type: "ReactNode", desc: "Body copy." },
              { name: "methods", type: "string[]", desc: "Method chips." },
              { name: "images / children", type: "Image[] / ReactNode", desc: "Marquee content." },
            ]}
          />
        </Section>
      </>
    ),
  },
  {
    id: "navbar",
    group: "Macro",
    title: "Navbar",
    blurb: "Floating, rounded, translucent top bar — collapses on mobile.",
    thumb: () => <div className="docs-bar__logo">AÉ</div>,
    content: () => (
      <>
        <Section title="Example">
          <Example
            block
            center={false}
            code={`<Navbar\n  links={[{ label: "Programs", href: "#" }, { label: "Reviews", href: "#" }]}\n  primaryCta={{ label: "Log in", href: "/login" }}\n  secondaryCta={{ label: "Contact Camille", href: "#" }}\n/>`}
          >
            <div style={{ background: "var(--surface-cream)", borderRadius: 16, padding: "12px 0" }}>
              <Navbar
                links={[
                  { label: "Certification", href: "#" },
                  { label: "Programs", href: "#" },
                  { label: "About Camille", href: "#" },
                  { label: "Reviews", href: "#" },
                ]}
                primaryCta={{ label: "Log in", href: "/login" }}
                secondaryCta={{ label: "Contact Camille", href: "#" }}
              />
            </div>
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "links", type: "NavLink[]", desc: "Primary navigation links." },
              { name: "primaryCta", type: "NavbarCta", desc: "Filled green CTA." },
              { name: "secondaryCta", type: "NavbarCta", desc: "White CTA with arrow." },
              { name: "logoSrc", type: "string", desc: "Logo image (AÉ mark)." },
            ]}
          />
        </Section>
        <Section title="Accessibility">
          <Callout><code>&lt;header&gt;</code> with a <code>nav aria-label="Primary"</code>; the mobile toggle uses <code>aria-expanded</code> / <code>aria-controls</code>.</Callout>
        </Section>
      </>
    ),
  },
  {
    id: "footer",
    group: "Macro",
    title: "Footer",
    blurb: "Cream→green band — logo, tagline, CTAs and three white link columns over a monospace copyright bar.",
    thumb: () => <div style={{ width: "100%", height: 60, borderRadius: 8, background: "linear-gradient(110deg, var(--surface-cream), var(--cta) 70%, var(--primary))" }} />,
    content: () => (
      <>
        <Section title="Example">
          <Example
            block
            center={false}
            code={`<Footer\n  tagline="Camille Hampton — Georgia DECAL-approved trainer…"\n  ctas={[\n    { label: "Get certified", arrow: true },\n    { label: "Pricing", variant: "ghost" },\n  ]}\n  columns={[\n    { title: "Programs", links: [...] },\n    { title: "Company", links: [...] },\n    { title: "Resources", links: [...] },\n  ]}\n/>`}
          >
            <Footer
              tagline="Camille Hampton — Georgia DECAL-approved trainer and early-childhood specialist. 30+ years bringing the Reggio Emilia approach to classrooms across Metro Atlanta and online."
              ctas={[
                { label: "Get certified", href: "#", arrow: true },
                { label: "Pricing", href: "#", variant: "ghost" },
              ]}
              columns={[
                { title: "Programs", links: [{ label: "Group trainings", href: "#" }, { label: "Self-paced courses", href: "#" }, { label: "Annual packs", href: "#" }, { label: "School licenses", href: "#" }] },
                { title: "Company", links: [{ label: "About Camille", href: "#" }, { label: "Reviews", href: "#" }, { label: "Speaking", href: "#" }, { label: "Contact", href: "#" }] },
                { title: "Resources", links: [{ label: "DECAL info", href: "#" }, { label: "Loose Parts guide", href: "#" }, { label: "Blog", href: "#" }, { label: "FAQ", href: "#" }] },
              ]}
            />
          </Example>
        </Section>
        <Section title="Props">
          <PropsTable
            rows={[
              { name: "brand", type: "ReactNode", def: '"Armstrong Educational Services"', desc: "Eyebrow wordmark next to the logo." },
              { name: "logoSrc", type: "string", def: '"/brand/logo-ae.png"', desc: "Logo image (cropped to the AÉ mark)." },
              { name: "tagline", type: "ReactNode", desc: "Dark-green intro paragraph." },
              { name: "ctas", type: "FooterCta[]", desc: "Buttons: variant 'solid' | 'ghost', optional arrow." },
              { name: "columns", type: "FooterColumn[]", desc: "The three white link columns." },
              { name: "copyright", type: "ReactNode", def: '"© 2026 Armstrong education"', desc: "Monospace copyright line." },
            ]}
          />
        </Section>
      </>
    ),
  },
];

export const entries: DocEntry[] = [...basic, ...macro];
export const basicEntries = basic;
export const macroEntries = macro;
