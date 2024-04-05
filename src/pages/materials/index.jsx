import MaterialsSection from "@/components/materials/MaterialsSection";
import { getUniversities } from "@/services/MaterialsService";

export async function getServerSideProps() {
  const materials = await getUniversities();
  return { props: { materials } };
}

export default function Materials({ materials }) {
  return (
    <>
      {materials.map((material) => (
        <MaterialsSection key={material.directory} university={material} />
      ))}
    </>
  );
}
