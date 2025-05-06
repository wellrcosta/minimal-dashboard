import { memo } from "react";

interface WebServiceFieldsProps {
  url: string;
  onUrlChange: (value: string) => void;
}

export const WebServiceFields = memo(({ 
  url, 
  onUrlChange 
}: WebServiceFieldsProps) => {
  return (
    <input
      type="text"
      value={url || ""}
      onChange={(e) => onUrlChange(e.target.value)}
      className="w-full p-2 rounded border dark:bg-slate-600 dark:border-slate-500"
      placeholder="Service URL"
    />
  );
}); 