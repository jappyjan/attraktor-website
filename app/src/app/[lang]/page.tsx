import { PostsList } from "./components/posts-list";

interface PageProps {
  params: {
    lang: string;
  };
}

export default function RootLangPage(props: PageProps) {
  return (
    <>
      <PostsList lang={props.params.lang} />
    </>
  );
}
