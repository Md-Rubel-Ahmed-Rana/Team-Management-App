import Head from "next/head";

const defaultTitle = "Team Manager";

type Props = {
  title: string;
  description: string;
  keywords: string;
};

const GetHead = ({ title = defaultTitle, description, keywords }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
    </Head>
  );
};

export default GetHead;
