import { runJavaInterpreter } from './javaInterpreter';

self.onmessage = (event: MessageEvent<{ code: string; stdin?: string }>) => {
  const { code, stdin } = event.data || { code: '' };
  const result = runJavaInterpreter(code, stdin || '');
  self.postMessage(result);
};
