import { CodeBlock, github } from "react-code-blocks";

function CodeComponent({ code, language, showLineNumbers, startingLineNumber }) {
    return (
        <CodeBlock
          text={code}
          language={language}
          showLineNumbers={showLineNumbers}
          startingLineNumber={startingLineNumber}
          theme={github}
        />
      );
    }
  export default CodeComponent;