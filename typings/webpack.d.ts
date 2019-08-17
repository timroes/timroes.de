declare module '*.less' {
  var less: { [className: string]: string };
  export default less;
}

declare module '*.svg' {
  var ReactComponent: React.FC<React.HTMLProps<SVGElement>>;
  export { ReactComponent };
}
