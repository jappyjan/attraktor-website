import { PageHeader } from "./page-header";

interface Props {
  children: React.ReactNode;
  title: string;
}

export function Page(props: Props) {
  return (
    <div className="w-full overflow-x-clip">
      <PageHeader title={props.title} />
      <div className="container mx-auto max-w-5xl px-4 py-4">
        {props.children}
      </div>
    </div>
  );
}
