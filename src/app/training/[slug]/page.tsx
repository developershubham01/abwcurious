import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TRAINING_TRACKS, TRAINING_BY_SLUG } from "@/data/training";
import { TrainingDetailPage } from "@/components/site/training-detail-page";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return TRAINING_TRACKS.map((track) => ({
    slug: track.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const track = TRAINING_BY_SLUG.get(slug);

  if (!track) {
    return {
      title: "Pathway Not Found — ABWcurious",
    };
  }

  return {
    title: `${track.title} — ABWcurious Training`,
    description: track.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const track = TRAINING_BY_SLUG.get(slug);

  if (!track) {
    notFound();
  }

  return (
    <main id="main" tabIndex={-1} className="flex-1 outline-none">
      <TrainingDetailPage track={track} />
    </main>
  );
}
