import { memo } from "react";
import { Service } from "../../types/dashboard";

interface CredentialsFieldsProps {
  credentials: Service['credentials'];
  onCredentialsChange: (field: string, value: string) => void;
}

export const CredentialsFields = memo(({ 
  credentials, 
  onCredentialsChange 
}: CredentialsFieldsProps) => {
  return (
    <>
      <input
        type="text"
        value={credentials?.username || ""}
        onChange={(e) => onCredentialsChange('username', e.target.value)}
        className="w-full p-2 rounded border dark:bg-slate-600 dark:border-slate-500"
        placeholder="Username"
      />
      <input
        type="text"
        value={credentials?.password || ""}
        onChange={(e) => onCredentialsChange('password', e.target.value)}
        className="w-full p-2 rounded border dark:bg-slate-600 dark:border-slate-500"
        placeholder="Password"
      />
      <input
        type="text"
        value={credentials?.port || ""}
        onChange={(e) => onCredentialsChange('port', e.target.value)}
        className="w-full p-2 rounded border dark:bg-slate-600 dark:border-slate-500"
        placeholder="Port (optional)"
      />
      <input
        type="text"
        value={credentials?.connectionString || ""}
        onChange={(e) => onCredentialsChange('connectionString', e.target.value)}
        className="w-full p-2 rounded border dark:bg-slate-600 dark:border-slate-500"
        placeholder="Connection String (optional)"
      />
    </>
  );
}); 