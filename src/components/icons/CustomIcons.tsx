import React from "react";

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  size?: number;
  width?: number | string;
  height?: number | string;
}

import GrafanaLogoSvg from "../../icons/Grafana_logo.svg";
import PrometheusLogoSvg from "../../icons/Prometheus_logo.svg";
import LokiLogoSvg from "../../icons/logo-loki.svg";
import MongoDBLogoSvg from "../../icons/mongodb-icon.svg";
import PostgreSQLLogoSvg from "../../icons/Postgresql_elephant.svg";
import RedisLogoSvg from "../../icons/Logo-redis.svg";
import RabbitMQLogoSvg from "../../icons/RabbitMQ_logo.svg";
import PortainerLogoSvg from "../../icons/portainer.svg";
import UptimeKumaLogoSvg from "../../icons/uptime-kuma.svg";
import ProxmoxLogoPng from "../../icons/proxmox.png";
import PgAdminLogoSvg from "../../icons/pgadmin.svg";
import FileBrowserLogoSvg from "../../icons/filebrowser.svg";
import WoodpeckerCILogoSvg from "../../icons/woodpecker-ci.svg";
import WoodpeckerLogoPng from "../../icons/woodpecker-logo.png";
import CronicleLogoSvg from "../../icons/cron.svg";
import CodeCovLogoSvg from "../../icons/codecov.svg";

const SvgIcon: React.FC<IconProps & { src: string }> = ({
  src,
  size = 24,
  width,
  height,
  ...props
}) => {
  return (
    <img
      src={src}
      width={width || size}
      height={height || size}
      alt="Icon"
      {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
    />
  );
};

export const GrafanaIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={GrafanaLogoSvg} {...props} />
);

export const PrometheusIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={PrometheusLogoSvg} {...props} />
);

export const LokiIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={LokiLogoSvg} {...props} />
);

export const MongoDBIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={MongoDBLogoSvg} {...props} />
);

export const PostgreSQLIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={PostgreSQLLogoSvg} {...props} />
);

export const RedisIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={RedisLogoSvg} {...props} />
);

export const RabbitMQIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={RabbitMQLogoSvg} {...props} />
);

export const PortainerIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={PortainerLogoSvg} {...props} />
);

export const UptimeKumaIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={UptimeKumaLogoSvg} {...props} />
);

export const ProxmoxIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={ProxmoxLogoPng} {...props} />
);

export const PgAdminIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={PgAdminLogoSvg} {...props} />
);

export const FileBrowserIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={FileBrowserLogoSvg} {...props} />
);

export const WoodpeckerCIIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={WoodpeckerCILogoSvg} {...props} />
);

export const WoodpeckerIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={WoodpeckerLogoPng} {...props} />
);

export const CronicleIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={CronicleLogoSvg} {...props} />
);

export const CodeCovIcon: React.FC<IconProps> = (props) => (
  <SvgIcon src={CodeCovLogoSvg} {...props} />
);

const CustomIcons = {
  Grafana: GrafanaIcon,
  Prometheus: PrometheusIcon,
  Loki: LokiIcon,
  MongoDB: MongoDBIcon,
  PostgreSQL: PostgreSQLIcon,
  Redis: RedisIcon,
  RabbitMQ: RabbitMQIcon,
  Portainer: PortainerIcon,
  UptimeKuma: UptimeKumaIcon,
  Proxmox: ProxmoxIcon,
  PgAdmin: PgAdminIcon,
  FileBrowser: FileBrowserIcon,
  WoodpeckerCI: WoodpeckerCIIcon,
  Woodpecker: WoodpeckerIcon,
  Cronicle: CronicleIcon,
  CodeCov: CodeCovIcon,
};

export default CustomIcons;
