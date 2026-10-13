import React from 'react';

export type JavaTokenType =
  | 'comment'
  | 'string'
  | 'char'
  | 'number'
  | 'keyword'
  | 'literal'
  | 'type'
  | 'class'
  | 'method'
  | 'annotation'
  | 'operator'
  | 'punct'
  | 'identifier'
  | 'whitespace'
  | 'other';

export interface JavaToken {
  text: string;
  type: JavaTokenType;
}

export function tokenizeJava(code: string): JavaToken[] {
  // Regex token matching rules in prioritized order
  const tokenRegex =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])')|(@\w+)|(\b(?:0x[0-9a-fA-F]+|\d+(?:\.\d+)?(?:[fFdDlL])?)\b)|(\b(?:public|private|protected|static|final|abstract|synchronized|native|transient|volatile|strictfp|class|interface|enum|record|extends|implements|package|import|new|return|if|else|switch|case|default|while|do|for|break|continue|try|catch|finally|throw|throws|instanceof|assert|this|super)\b)|(\b(?:true|false|null)\b)|(\b(?:void|int|double|float|long|short|byte|boolean|char|String|Integer|Double|Float|Long|Short|Byte|Boolean|Character|Scanner|System|Math|PrintStream|Object|Arrays|List|ArrayList|Map|HashMap|Set|HashSet|Exception|Throwable)\b)|(\b[a-zA-Z_$][a-zA-Z0-9_$]*(?=\s*\())|([+\-*/%=&|^!~?:<>]+)|([{}()\[\],;.])|(\b[a-zA-Z_$][a-zA-Z0-9_$]*\b)|(\s+)|(.)/g;

  const tokens: JavaToken[] = [];
  let match: RegExpExecArray | null;
  let lastSignificant = '';

  while ((match = tokenRegex.exec(code)) !== null) {
    const [
      raw,
      comment,
      stringOrChar,
      annotation,
      number,
      keyword,
      literal,
      builtinType,
      method,
      operator,
      punct,
      identifier,
      whitespace,
    ] = match;

    let type: JavaTokenType = 'other';
    if (comment) {
      type = 'comment';
    } else if (stringOrChar) {
      type = raw.startsWith("'") ? 'char' : 'string';
    } else if (annotation) {
      type = 'annotation';
    } else if (number) {
      type = 'number';
    } else if (keyword) {
      type = 'keyword';
      lastSignificant = raw;
    } else if (literal) {
      type = 'literal';
      lastSignificant = raw;
    } else if (builtinType) {
      type = 'type';
      lastSignificant = raw;
    } else if (method) {
      type = 'method';
      lastSignificant = raw;
    } else if (operator) {
      type = 'operator';
      lastSignificant = raw;
    } else if (punct) {
      type = 'punct';
      lastSignificant = raw;
    } else if (identifier) {
      if (lastSignificant === 'class' || /^[A-Z]/.test(raw)) {
        type = 'class';
      } else {
        type = 'identifier';
      }
      lastSignificant = raw;
    } else if (whitespace) {
      type = 'whitespace';
    }

    tokens.push({ text: raw, type });
  }

  return tokens;
}

/**
 * Renders Java code with full modern syntax highlighting (VS Code / IntelliJ theme palette)
 */
export function renderHighlightedJava(code: string): React.ReactNode {
  const tokens = tokenizeJava(code);

  return tokens.map((token, index) => {
    switch (token.type) {
      case 'comment':
        return (
          <span key={index} className="text-slate-400 italic">
            {token.text}
          </span>
        );
      case 'string':
        return (
          <span key={index} className="text-emerald-300">
            {token.text}
          </span>
        );
      case 'char':
        return (
          <span key={index} className="text-teal-300">
            {token.text}
          </span>
        );
      case 'number':
        return (
          <span key={index} className="text-amber-300 font-medium">
            {token.text}
          </span>
        );
      case 'keyword':
        return (
          <span key={index} className="text-purple-400 font-semibold">
            {token.text}
          </span>
        );
      case 'literal':
        return (
          <span key={index} className="text-pink-400 font-semibold">
            {token.text}
          </span>
        );
      case 'type':
        return (
          <span key={index} className="text-amber-200 font-medium">
            {token.text}
          </span>
        );
      case 'class':
        return (
          <span key={index} className="text-teal-300 font-medium">
            {token.text}
          </span>
        );
      case 'method':
        return (
          <span key={index} className="text-sky-300">
            {token.text}
          </span>
        );
      case 'annotation':
        return (
          <span key={index} className="text-yellow-400">
            {token.text}
          </span>
        );
      case 'operator':
        return (
          <span key={index} className="text-sky-400">
            {token.text}
          </span>
        );
      case 'punct':
        return (
          <span key={index} className="text-slate-400">
            {token.text}
          </span>
        );
      case 'identifier':
        return (
          <span key={index} className="text-slate-100">
            {token.text}
          </span>
        );
      default:
        return <span key={index}>{token.text}</span>;
    }
  });
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Returns HTML string with inline colors for react-simple-code-editor (zero-drift, uniform font weight)
 */
export function highlightJavaToHtml(code: string): string {
  const tokens = tokenizeJava(code);
  return tokens
    .map((token) => {
      const text = escapeHtml(token.text);
      switch (token.type) {
        case 'comment':
          return `<span style="color: #94a3b8; font-style: italic;">${text}</span>`;
        case 'string':
          return `<span style="color: #6ee7b7;">${text}</span>`;
        case 'char':
          return `<span style="color: #5eead4;">${text}</span>`;
        case 'number':
          return `<span style="color: #fcd34d;">${text}</span>`;
        case 'keyword':
          return `<span style="color: #c084fc;">${text}</span>`;
        case 'literal':
          return `<span style="color: #f472b6;">${text}</span>`;
        case 'type':
          return `<span style="color: #fde68a;">${text}</span>`;
        case 'class':
          return `<span style="color: #5eead4;">${text}</span>`;
        case 'method':
          return `<span style="color: #7dd3fc;">${text}</span>`;
        case 'annotation':
          return `<span style="color: #facc15;">${text}</span>`;
        case 'operator':
          return `<span style="color: #38bdf8;">${text}</span>`;
        case 'punct':
          return `<span style="color: #94a3b8;">${text}</span>`;
        case 'identifier':
          return `<span style="color: #f1f5f9;">${text}</span>`;
        default:
          return text;
      }
    })
    .join('');
}

