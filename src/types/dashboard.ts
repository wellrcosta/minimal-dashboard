export interface Service {
  id: string;
  name: string;
  type: "web" | "info";
  url?: string;
  icon: string;
  description?: string;
  credentials?: {
    username?: string;
    password?: string;
    port?: string;
    connectionString?: string;
  };
}

export interface Section {
  id: string;
  name: string;
  services: Service[];
} 