import { redirect } from "routing";


const CMS = async ({ params: { locale } }: {
  params: { locale: string }
}) => {
  console.log(locale);
  redirect({ href: { pathname: "/cms/conference" }, locale: locale });
};

export default CMS;