declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "redux-persist/integration/react" {
  import { PersistGateProps } from "redux-persist/es/integration/react";

  export class PersistGate extends React.Component<PersistGateProps> {}
}
