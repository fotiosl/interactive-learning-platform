# Content, Didactic & Privacy Specification (`RULES.md`)

Normative specifications for generating, editing, auditing, and publishing student learning tasks across the platform. Every rule in this document is machine-enforced by `npm.cmd run audit` (`prebuild`).

---

## 1. Core Principles, Integrity & Anti-Spoiler Invariants

### 1.1 Independence & Probetest Self-Containment
- **Invariant**: Any question sequence $(Q_1, Q_2, \dots, Q_m)$ within a task or unit must maintain pairwise semantic and numerical independence.
- **Single- & Multi-Token Leakage Prevention**: No question $Q_{i+1}$ may expose the target token, multi-word answer phrase, short `value + unit` answer (e.g., `12 m`, `5 cm`), intermediate equation result (e.g., `a = 27 cm`, `h = 4 cm`), or full context sentence required by $Q_i$.
- **Multi-Step Math & Geometry Rule**: Never carry over the calculated numerical solution of $Q_i$ as a given parameter in $Q_{i+1}$'s prompt. Always assign fresh, independent dimensions to consecutive sub-problems.
- **Probetest Standalone Invariant**: Every question must remain 100% solvable when randomized in Probetest mode **without** access to `task.image` / `task.images` or neighboring questions. Never use blind cross-references (`"bei Aufgabe 1"`, `"aus der vorherigen Frage"`); repeat all required given dimensions directly inside the question's `prompt`.
- **Single Target per Input Field**: A non-open-ended `input` or `rechnung` question must ask for **one** clearly defined target value (never combine a numeric calculation with an open judgment like `"Berechne X und beurteile, ob ..."` in one input box).
- **Enforcement**: Interleave distinct vocabulary, distinct numerical parameters, and varied interaction types across consecutive items.

### 1.2 Prompt Neutrality & Scaffolding Invariance
- **`prompt`**: Must specify task criteria without embedding solutions, parenthetical sample answers (`(z. B. ...)`), structural indicators, or leading formulations.
- **`placeholder`**: Must describe format and expected unit only. Must never contain `z. B.`, solution tokens, concrete target values, or suggestive starter text.
- **`hint`**: Must provide heuristic strategies and conceptual problem-solving steps only. Strictly forbidden to reveal target root letters (`beginnt mit ...`), initial syllables, literal opening phrases (`Beginne mit „...“`), solution tokens, intermediate arithmetic results (e.g., `c/2 = 6 cm`, `(-3)² = 9`, `(2 - 6 = -4)`), or concrete substituted formulas (`sqrt(7² + 1,5²)`).
- **Clean JSON Newlines**: Multi-line text fields (`sampleSolution`, `hint`, `prompt`, `description`) must use valid JSON `\n` line breaks — never double-escaped `\\n` literals (except inside Java source code of `code` exercises).

### 1.3 Identifier & Asset Integrity
- **Global Question ID Uniqueness**: Every `question.id` must be globally unique across all units of a student so `localStorage` state keys (`learning_ans_<slug>_<questionId>`) never collide.
- **Asset Existence & Visibility**: Every `task.image.src`, every entry in `task.images[].src`, and every `task.teacherSolutionImage.src` must resolve to an existing compressed `.webp` (or `.svg`) asset under `public/`. Student-facing multi-page reference materials (e.g., page 2 of a test) MUST use `task.images` so students can view them; reserve `teacherSolutionImage` strictly for hidden teacher-only solution sheets.

---

## 2. Interaction Type Specifications

### 2.1 Sentence & Expression Builder (`sentence_builder`)
- **Case Invariant**: All tile strings must be stored in lowercase.
- **Punctuation Invariant**: Strip terminal sentence punctuation (`.`, `!`, `?`) from all tiles.
- **Syntactic Delimiters & Comma Validity**:
  - Retain clause-internal commas (`,`) attached to their governing tile (e.g., pre-posed subordinate clauses).
  - **No Spurious Commas**: A tile may end with `,` **only** if that exact phrase is followed by a comma in at least one valid permutation in `correctAnswers`. Never attach trailing commas to tiles that never precede a clause boundary.
- **Shuffled Storage Across All Permutations**: The `tiles` array in JSON must be non-trivially permuted; it must **never** match the token order of *any* accepted solution in `correctAnswers` (not just `correctAnswers[0]`).
- **Zero-Orphan Invariant**: Every tile in `tiles` must be utilized in every accepted solution in `correctAnswers`. No unused distractor tiles.
- **Permutation Invariant**: `correctAnswers` must enumerate all valid syntactic and semantic permutations (e.g., pre-posed vs. post-posed dependent clauses; commutative operations).

### 2.2 Multiple Choice (`choice`)
- **Cardinality & Uniqueness Invariant**: Exactly 1 unambiguously correct option; $N \ge 3$ (typically $N = 4$) distinct, non-duplicate options.
- **Option Symmetry & Homogeneity**:
  - **Length Balance**: Multi-word/explanatory options must be balanced in character length (for options $> 25$ chars: $\max(len) \le 1.5 \times \min(len)$ or $\max(len) - \min(len) \le 15$; short phrases/clauses must avoid pairing single 3-letter words against long multi-word phrases with $\max/\min \ge 3.0$).
  - **Syntactic & Granular Parity**: All options must share identical grammatical form and depth of detail.
  - **Feature Parity**: Parenthetical qualifiers `(…)`, explanatory definitions, or slash-separated qualifiers `/` must never appear exclusively on the correct option, nor on all options *except* a single naked distractor. Apply structural annotations symmetrically across all options or omit them completely.
- **Distractor Plausibility**: Distractors must represent realistic misconceptions within the exact same taxonomic category.
- **Key Distribution & Anti-Streak Invariants**:
  - **No Mono-Index Tasks**: Never assign all MC questions in a task ($N_{\text{mc}} \ge 3$) to the same option index.
  - **Dominance Cap**: For tasks with $N_{\text{mc}} \ge 4$, no single option index may account for $\ge 70\%$ of correct answers.
  - **Max Streak = 2**: Never place $\ge 3$ consecutive multiple-choice questions on the identical correct option index (`A, A, A` is forbidden).

### 2.3 Open Input (`input`)
- **Completeness**: Every non-open-ended `input` question (`!isOpenEnded`) must define at least one entry in `correctAnswers`; every open-ended question (`isOpenEnded: true`) must supply a `sampleSolution`.
- **Equivalence Class Enumeration**:
  - **Decimal Parity**: Whenever a numeric answer contains a fractional decimal part, `correctAnswers` must include **both** German decimal comma (`12,5`) and dot (`12.5`) representations, with and without unit suffixes.
  - **Lexical Variants**: Include base forms with and without articles/units where natural.

### 2.4 Token Selection (`word_select`)
- **`words`**: Ordered array of tokens forming the complete target sentence or expression.
- **Selectable Subsequence Invariant**: Every entry in `correctAnswers` must be an exact ordered subsequence of tokens selectable from `words` (normalized and space-joined, e.g. `"geht unter"` for discontinuous German *Prädikatsklammern*). Never include unselectable orthographic variants (e.g., `"bäckt"` when `words` contains `"backt"`) or literal ellipsis strings (`"..."`) in `correctAnswers`.
- **Subject-Agnostic Scaffolding**: Component-level UI labels must remain universal and domain-agnostic.

### 2.5 Programming Tasks (`code`)
- **Executable Triad Specification**: Every non-playground programming exercise must supply:
  - `sampleSolution`: Verified reference Java code that compiles and executes cleanly in `runJavaInterpreter` (with `stdin` if applicable) and produces output matching `expectedOutput` via `checkOutputMatch`.
  - `initialCode`: Starter template that compiles/displays cleanly and **must not** already output `expectedOutput` unmodified.
  - `expectedOutput`: Deterministic target console output.

### 2.6 Mathematical Calculation (`rechnung`)
- **Interaction & Task Type**: Supported both at the task level (`type: 'rechnung'`) and question level (`interactionType: 'rechnung'`).
- **Feature Set & Neutral Scratchpad**:
  - Interactive mathematical symbol keypad (`√`, `²`, `³`, `·`, `:`, `+`, `−`, `±`, `π`, `(`, `)`, units `cm`, `m`, `dm`, `mm`, `cm²`, `m²`) inserting at cursor position and inserting ASCII `-` (with Unicode minus `−` / `\u2212` normalized identically to `-` during matching).
  - Persistent, **strictly neutral** intermediate scratchpad (`rechenweg`) saved to local storage so students can structure steps, formulas, and notes independently. **Never** pre-fill equations, add `"Formel einfügen"` buttons, or define `formulaTemplate` / `rechenwegHint` properties.
  - Focused target result field with Enter-key evaluation.
  - **Dual-Consumer Parity**: Every `rechnung` state/prop on `QuestionInteractionFields` must be wired into both `InputQuestionItem` and `ProbetestClient`.
- **Completeness & Equivalence Classes**:
  - Must supply complete `correctAnswers` including decimal comma and dot representations (`12,5`, `12.5`), natural physical units (`13 m`, `13m`, `13`), squared notation variants (`63 cm²`, `63 cm^2`, `63 cm2`), and variable-prefixed forms where natural (`c = 13 m`, `A = 63 cm²`).
  - Must supply a clear, multi-step `sampleSolution` (using clean JSON `\n` line breaks) showing givens, formula, intermediate evaluation, and final answer with units.
- **Anti-Spoiler & Single-Target Invariant**: Hints, placeholders, and scratchpads must never reveal numerical solutions, intermediate calculated values, or substituted equations, and each question must target a single computable quantity.

---

## 3. Didactic Standards, Privacy & Institutional Agnosticism

- **Perspective**: Direct, respectful, eye-level student address.
- **Zero Student Names in Questions**: Never place student first names, nicknames, or slugs inside student-facing `prompt`, `hint`, `options`, or `sampleSolution` fields (preserve both GDPR privacy and Probetest portability).
- **Institutional & Worksheet Agnosticism**: Never reference grade levels (`7. Klasse`, `6. Schuljahr`, `Oberstufe`, `8d`), school types (`Gymnasium`, `Realschule`, `Berufskolleg`), textbook/workbook page numbers (`Deutschbuch S. 164`, `Workbook S. 21`), or physical worksheet labels (`Übungsblatt`, `Arbeitsblatt`) inside student-facing `prompt`, `task.description`, `task.dateBadge`, `task.readingText`, `unit.title`, or `unit.description` fields.

---

## 4. GDPR / DSGVO & Public Repository Anonymization (`sync:public`)

When exporting curriculum modules to the public showcase repository (`interactive-learning-platform`), strict **Art. 4 Nr. 1 DSGVO** anonymization (including protection against *singling-out* via indirect quasi-identifiers) is mandatory:

1. **Zero Direct Identifiers**: All student names, initials, nicknames, directory names, slugs, and aliases across the entire private manifest (`src/data/students/*/meta.json`) are dynamically blocklisted and must never appear in any public file.
2. **Zero Indirect / Quasi-Identifiers**:
   - **Synthetic Dates Only**: Real tutoring session dates and class-test dates (`DD.MM.YYYY` session dates or class-test dates) are strictly forbidden in public filenames, URLs, titles, descriptions, and badges. Public units use synthetic module dates (`01.01.2026`, `02.01.2026`) and neutral topic badges.
   - **No Classroom / Book Fingerprints**: Strip all class identifiers (`8d`), textbook/workbook page numbers (`Buch S. 164`, `S. 21 im Workbook`), and personal worksheet references.
3. **Complete Media & Tutor-Note Isolation**:
   - Exclude all subdirectories under `public/` (zero student scans or solution photos).
   - Strip all task-level `image`, `images`, `teacherSolutionImage`, and private session `teacherNotes` fields during JSON export.
4. **Clean Orphan Git History**: Public releases use an orphan commit without private commit history.
