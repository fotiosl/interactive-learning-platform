# Content & Exercise Specification (`RULES.md`)

Normative specifications for generating, editing, and verifying student learning tasks across the platform.

---

## 1. Core Principles & Anti-Spoiler Invariants

### 1.1 Independence of Sequential Tasks
- **Invariant**: Any question sequence $(Q_1, Q_2, \dots, Q_m)$ within a task or unit must maintain pairwise semantic independence.
- **Leakage Prevention**: No question $Q_{i+k}$ may expose the target token, solution pattern, or full context sentence required by $Q_i$.
- **Anti-Pattern**: Revealing a solution token in a preceding or succeeding prompt, cloze context, or sentence builder within the same sequence.
- **Enforcement**: Interleave distinct vocabulary, distinct sentence structures, and varied interaction types across consecutive items.

### 1.2 Prompt Neutrality & Scaffolding Invariance
- **`prompt`**: Must specify task criteria without embedding solutions, structural indicators, or leading formulations.
- **`placeholder`**: Must describe format and expected unit only (e.g., generic format descriptors). Must never provide solution tokens, concrete target values, or suggestive starter text.
- **`hint`**: Must provide heuristic strategies and conceptual problem-solving steps only. Strictly forbidden to reveal target root letters, initial syllables, solution tokens, or intermediate arithmetic results.

---

## 2. Interaction Type Specifications

### 2.1 Sentence & Expression Builder (`sentence_builder`)
- **Case Invariant**: All tile strings must be stored in lowercase.
- **Punctuation Invariant**: Strip terminal sentence punctuation (`.`, `!`, `?`) from all tiles.
- **Syntactic Delimiters**: Retain all clause-internal delimiters (specifically commas `,`) attached to their governing tile. Commas are mandatory syntactic constraints for clause ordering and must not be stripped.
- **Shuffled Storage**: The tile array in source code must be non-trivially permuted; never persist tiles pre-arranged in solution order.
- **Zero-Orphan Invariant**: Every tile in `tiles` must be utilized in the solution. No unused distractor tiles.
- **Permutation Invariant**: `correctAnswers` must enumerate all valid syntactic and semantic permutations (e.g., subordinate clause pre-posed vs. post-posed; commutative algebraic operations).

### 2.2 Multiple Choice (`choice`)
- **Cardinality Invariant**: Exactly 1 unambiguously correct option; remaining options are plausible distractors ($N \ge 3$, typically $N = 4$).
- **Option Symmetry & Homogeneity**:
  - **Length Invariance**: All options within a question must be balanced in character length ($\max(len) \le 1.3 \times \min(len)$). No option may stand out as substantially longer or shorter.
  - **Syntactic & Granular Parity**: All options must share identical grammatical form and depth of detail (e.g., all single terms, or all full clauses with parallel phrasing).
  - **Feature Parity**: Parenthetical qualifiers, explanatory definitions, glosses, or slash-separated synonyms must never be attached solely to the correct option. Any structural annotation must either be applied symmetrically across all options or eliminated entirely.
- **Distractor Plausibility**: Distractors must represent realistic misconceptions within the exact same taxonomic category. Absurd, comical, or trivially dismissible distractors are strictly forbidden.
- **Key Distribution**: The index of the correct answer must be uniformly distributed across $\{0, \dots, N-1\}$ throughout the task set.

### 2.3 Open Input (`input`)
- **Normalization**: Input evaluation normalizes casing, surrounding whitespace, and punctuation.
- **Equivalence Class Enumeration**: `correctAnswers` must exhaustively enumerate all valid standard representations:
  - Numeric values: Decimal comma and decimal point variants, with and without unit suffixes.
  - Lexical terms: Base forms with and without articles, infinitive particles, and standard orthographic variants.

### 2.4 Token Selection (`word_select`)
- **`words`**: Ordered array of tokens forming the complete target sentence or expression.
- **`correctAnswers`**: Exact target token(s) matching the requested linguistic or semantic category.
- **Subject-Agnostic Scaffolding**: All component-level instructions, guidance labels, and helper texts must remain completely universal. Never embed subject-specific terminology or domain-bound concepts into generic selection scaffolding.

### 2.5 Programming Tasks (`code`)
- **Triad Specification**: Every programming exercise must supply:
  - `sampleSolution`: Fully functional, verified reference code.
  - `initialCode`: Clean starter template with requisite scaffolding, class wrappers, and boilerplate.
  - `expectedOutput`: Deterministic standard console output against which submissions are verified.
  - `stdin`: Pre-configured input stream if the exercise involves standard input.

---

## 3. Didactic Standards & Tone

- **Perspective**: Direct, respectful, eye-level student address.
- **Institutional Agnosticism**: Never reference grade levels, class numbers, school types, or curriculum tiers inside student-facing prompts or descriptions.
- **Contextual Authenticity**: Frame exercises in modern, realistic scenarios rather than contrived textbook clichés.
