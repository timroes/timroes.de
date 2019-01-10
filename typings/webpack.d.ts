declare module '*.less' {
  var less: { [className: string]: string };
  export default less;
}

declare module '*.svg' {
  var ReactComponent: React.SFC<React.HTMLProps<SVGElement>>;
  export { ReactComponent };
}
