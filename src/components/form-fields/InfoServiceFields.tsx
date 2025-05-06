import { memo } from "react";
import { Service } from "../../types/dashboard";
import { CredentialsFields } from "./CredentialsFields";

interface InfoServiceFieldsProps {
  description: string;
  url?: string;
  credentials: Service["credentials"];
  onDescriptionChange: (value: string) => void;
  onUrlChange?: (value: string) => void;
  onCredentialsChange: (field: string, value: string) => void;
}

export const InfoServiceFields = memo(
  ({
    description,
    url,
    credentials,
    onDescriptionChange,
    onUrlChange,
    onCredentialsChange,
  }: InfoServiceFieldsProps) => {
    return (
      <div className="space-y-2">
        <input
          type="text"
          value={description || ""}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="w-full p-2 rounded border dark:bg-slate-600 dark:border-slate-500"
          placeholder="Description"
        />
        <input
          type="text"
          value={url || ""}
          onChange={
            onUrlChange ? (e) => onUrlChange(e.target.value) : undefined
          }
          className="w-full p-2 rounded border dark:bg-slate-600 dark:border-slate-500"
          placeholder="URL (opcional)"
        />
        <CredentialsFields
          credentials={credentials}
          onCredentialsChange={onCredentialsChange}
        />
      </div>
    );
  }
);
