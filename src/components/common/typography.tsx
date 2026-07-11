interface TypographyProps {
  id?: string;
  text: string;
  type: string;
}

export const Typography: React.FC<TypographyProps> = ({ id, text, type }) => {
  switch (type) {
    case "h1":
      return (
        <h1
          id={id}
          className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
        >
          {text}
        </h1>
      );
    case "h2":
      return (
        <h2
          id={id}
          className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0"
        >
          {text}
        </h2>
      );
    case "h3":
      return (
        <h3
          id={id}
          className="scroll-m-20 text-2xl font-semibold tracking-tight"
        >
          {text}
        </h3>
      );
    case "h4":
      return (
        <h4
          id={id}
          className="scroll-m-20 text-xl font-semibold tracking-tight"
        >
          {text}
        </h4>
      );
    case "error":
      return (
        <p id={id} className="text-sm text-destructive">
          {text}
        </p>
      );
    case "muted":
      return (
        <p id={id} className="text-sm text-muted-foreground">
          {text}
        </p>
      );
    case "p":
    default:
      return (
        <p id={id} className="leading-7 [&:not(:first-child)]:mt-6">
          {text}
        </p>
      );
  }
};
