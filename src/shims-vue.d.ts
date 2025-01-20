declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<
    Record<string, unknown>, // Props
    Record<string, unknown>, // Emits
    unknown // Setup return type
  >;
  export default component;
}
