
export function Card({
                       title,
                       children,
                     }: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
      <div
          className="border p-4 bg-white rounded-lg shadow-xl"
      >
        <h1 className="text-xl border-b pb-2 font-bold">
          {title}
        </h1>
        <h4>{children}</h4>
      </div>
  );
}