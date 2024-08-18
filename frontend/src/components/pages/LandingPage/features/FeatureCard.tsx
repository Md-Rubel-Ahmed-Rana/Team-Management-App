/* eslint-disable @next/next/no-img-element */
import { IFeature } from "@/interfaces/feature.interface";
type Props = {
  feature: IFeature;
  animation: boolean;
};

const FeatureCard = ({ feature, animation }: Props) => {
  const { title, description, image, animation: animate } = feature;
  return (
    <div
      data-aos={animation ? animate : ""}
      className="features-card p-6 rounded-lg shadow-md lg:flex flex-col gap-4"
    >
      <img className="w-full h-60 rounded-lg" src={image} alt={title} />
      <h3 className="text-xl font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
