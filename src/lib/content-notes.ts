/**
 * Shared Field Notes content — single source of truth consumed by:
 * - the Notes section (src/components/site/notes.tsx)
 * - the RSS feed route (src/app/api/rss/route.ts)
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; caption: string; lines: string[] };

export interface Note {
  slug: string;
  index: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  blocks: Block[];
}

export const NOTES: Note[] = [
  {
    slug: "llm-in-production",
    index: "01",
    tag: "AI Engineering",
    title: "Shipping LLM features that survive production",
    excerpt:
      "Demos are easy. The distance between a impressive prototype and a feature your customers rely on is measurement, guardrails and a plan for the day the model is wrong.",
    date: "2025-11-18",
    readTime: "6 min",
    blocks: [
      {
        type: "p",
        text: "Every week someone shows us a dazzling LLM demo. Every month someone asks us to rescue the same demo after it met real users. The gap is never the model — it is everything around the model.",
      },
      { type: "h", text: "Measure before you ship" },
      {
        type: "p",
        text: "If you cannot score an output, you cannot improve it. We build a small eval set with the client before writing the feature: 30–80 real inputs, graded on the three or four things that actually matter — correctness, tone, refusals, latency. Every prompt or model change re-runs the set. It is not glamorous, and it is the single highest-leverage hour we spend.",
      },
      { type: "h", text: "Design for the wrong answer" },
      {
        type: "p",
        text: "Users do not experience your average response time; they experience your worst response. Production LLM features need explicit failure paths: confidence thresholds, retrieval 'I don't know' behavior, human handoff, and circuit breakers when a provider degrades. The UI should make uncertainty visible instead of laundering it through confident typography.",
      },
      { type: "code", caption: "the 3-line policy we put in every system prompt", lines: [
        "If the context does not contain the answer, say so — never invent sources.",
        "Prefer the short, verifiable answer over the long, impressive one.",
        "When confidence is low, ask one clarifying question instead of guessing.",
      ] },
      { type: "h", text: "Keep humans in the loop where it counts" },
      {
        type: "p",
        text: "Auto-resolve the 90% that is repetitive. Route the 10% that is ambiguous, expensive or emotional to a person — with the full transcript attached. That ratio is where the ROI lives, and it is different for every product. Find it with data, not with a blog post.",
      },
      {
        type: "p",
        text: "None of this is novel. All of it is skipped. The teams that do the boring parts are the ones whose AI features are still running a year later.",
      },
    ],
  },
  {
    slug: "rag-retrieval-details",
    index: "02",
    tag: "RAG & Search",
    title: "The retrieval details most RAG demos skip",
    excerpt:
      "Chunk size gets all the attention, but hybrid search, reranking and source attribution move the accuracy needle far more — and none of them require a bigger model.",
    date: "2025-10-02",
    readTime: "5 min",
    blocks: [
      {
        type: "p",
        text: "A RAG system is only as good as what the model gets to read. Most 'it hallucinates' complaints are actually retrieval complaints — the right answer existed in the corpus and never reached the prompt.",
      },
      { type: "h", text: "Hybrid beats pure vectors" },
      {
        type: "p",
        text: "Embeddings are wonderful at meaning and terrible at exact terms: product codes, part numbers, names. Pair vector search with BM25 keyword matching and merge results. It is a 20-line change that routinely fixes the long tail of 'why didn't it find this' tickets.",
      },
      { type: "h", text: "Rerank what you retrieved" },
      {
        type: "p",
        text: "Retrieve wide (top 50), then rerank with a cross-encoder down to the 5 passages you actually paste into the prompt. Cross-encoders read query and document together, so they are dramatically better at relevance — and cheap, because they only see 50 short texts.",
      },
      { type: "h", text: "Show your sources" },
      {
        type: "ul",
        items: [
          "Cite the document and passage for every claim — users forgive a wrong answer with a source faster than a right one without one.",
          "Log the retrieved chunks with each response; when accuracy drops you will want the receipts.",
          "Attribute gracefully: 'per the Q3 policy doc' beats a wall of citation icons.",
        ],
      },
      {
        type: "p",
        text: "Bigger context windows will not save a retrieval system that surfaces the wrong five paragraphs. Fix retrieval first — the model is usually the last thing worth changing.",
      },
    ],
  },
  {
    slug: "design-systems-still-matter",
    index: "03",
    tag: "Design Engineering",
    title: "Why we still hand-roll design systems",
    excerpt:
      "Utilities and AI codegen made UI faster than ever. Here is why we still invest in tokens, primitive components and documentation — and how it cuts build time in half.",
    date: "2025-08-21",
    readTime: "4 min",
    blocks: [
      {
        type: "p",
        text: "It has never been faster to produce an interface — and never easier to produce a mediocre one. Speed without system is how products end up with six grays, four radii and buttons that shuffle every release.",
      },
      { type: "h", text: "Tokens are the contract" },
      {
        type: "p",
        text: "Before any screen, we agree on the vocabulary: color roles, type scale, spacing grid, radii, focus treatment. For this studio site we used an IBM Carbon-derived set — one blue, square corners, hairline borders, Plex Sans/Mono — and every decision downstream became mechanical. That is the point: tokens do not limit taste, they delete arguments.",
      },
      { type: "h", text: "Primitives over pages" },
      {
        type: "p",
        text: "A dozen well-built primitives — buttons with real hover/focus/disabled states, form fields with validation states, tables, dialogs — compound. AI generation works dramatically better inside a system: 'a Carbon-style primary button' produces better output than a blank canvas, because the system is the prompt.",
      },
      { type: "h", text: "The payoff, measured" },
      {
        type: "ul",
        items: [
          "Feature builds get measurably faster — our design-system clients ship screens roughly 2× quicker by sprint three.",
          "Accessibility stops being a phase: focus order, contrast and hit targets are inherited, not retrofitted.",
          "Onboarding new engineers takes days, because the codebase reads like documentation.",
        ],
      },
      {
        type: "p",
        text: "Frameworks will keep changing. A system built on tokens and primitives ports with you — and your users never see the migration.",
      },
    ],
  },
];
