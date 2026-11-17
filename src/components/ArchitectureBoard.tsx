import SystemsStudio from './SystemsStudio';

type Props = {
  slug: string;
};

export default function ArchitectureBoard({ slug }: Props) {
  return <SystemsStudio initialSlug={slug} singleSystem />;
}
