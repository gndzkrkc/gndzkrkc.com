interface PersonJsonLdProps {
  name: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  sameAs: string[];
  email: string;
}

export default function PersonJsonLd({
  name,
  title,
  description,
  url,
  image,
  sameAs,
  email,
}: PersonJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    url,
    jobTitle: title,
    description,
    ...(image && { image }),
    sameAs,
    email,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
