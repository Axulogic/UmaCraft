export function StructuredData({
  items,
}: {
  items: Record<string, unknown>[];
}) {
  return (
    <>
      {items.map((item, index) => (
        <script
          key={`${String(item["@type"] ?? "schema")}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
