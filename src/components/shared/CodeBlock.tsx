
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

const CodeBlock = ({ code, language, title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-cepheus-gray-dark/50 bg-cepheus-darker">
      {title && (
        <div className="bg-cepheus-darker border-b border-cepheus-gray-dark/50 px-4 py-2 flex justify-between items-center">
          <span className="text-sm text-cepheus-gray-light">{title}</span>
          <Button
            variant="ghost"
            size="sm"
            className="text-cepheus-gray hover:text-cepheus-green"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-cepheus-green" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
      <pre className={`p-4 overflow-x-auto ${!title && 'relative'}`}>
        {!title && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 text-cepheus-gray hover:text-cepheus-green"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="h-4 w-4 text-cepheus-green" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        )}
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
