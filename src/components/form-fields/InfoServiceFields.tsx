import { memo } from "react";
import { Service } from "../../types/dashboard";
import { CredentialsFields } from "./CredentialsFields";

interface InfoServiceFieldsProps {
  description: string;
  credentials: Service['credentials'];
  onDescriptionChange: (value: string) => void;
  onCredentialsChange: (field: string, value: string) => void;
}

export const InfoServiceFields = memo(({ 
  description, 
  credentials, 
  onDescriptionChange, 
  onCredentialsChange 
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
      <CredentialsFields 
        credentials={credentials} 
        onCredentialsChange={onCredentialsChange} 
      />
    </div>
  );
}); 