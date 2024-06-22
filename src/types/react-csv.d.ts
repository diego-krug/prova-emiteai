declare module 'react-csv' {
    import { Component, ReactNode } from 'react';
  
    export interface CSVLinkProps {
      data: string | object[];
      headers?: object[];
      separator?: string;
      filename?: string;
      uFEFF?: boolean;
      asyncOnClick?: boolean;
      onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void | boolean;
      enclosingCharacter?: string;
      target?: string;
      className?: string;
      style?: React.CSSProperties;
      children?: ReactNode;
    }
  
    export class CSVLink extends Component<CSVLinkProps, any> {}
  }
  