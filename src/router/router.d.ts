export interface Routes {
  path: string;
  name?: string;
  component: () => Promise<any>;
  mate?: {
    title?: string;
    icon?: string;
  };
  redirect?: (() => string) | string;
  children?: Routes[];
}
