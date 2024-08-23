import { RecentPostsList } from "~/components/blog/recent-posts-list";
import { Page } from "~/components/page";

export default async function BlogHomePage(props: {
  params: { lang: string };
}) {
  return (
    <Page title="Blog">
      <RecentPostsList lang={props.params.lang} />
    </Page>
  );
}
