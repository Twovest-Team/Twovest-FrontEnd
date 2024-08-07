import ContentSlider from "../sliders/ContentSlider";
import LookCard from "./LookCard";

export const LooksHomepage = ({ data }) => {
  const looks = data;
  //console.log(looks)

  return (
    <ContentSlider>
      {looks && looks.map((item) => {
        return (
          <li key={item.id} >
            <LookCard
              key={item.id}
              look={item}
              slider={true}
            />
          </li>
        );
      })}
    </ContentSlider>
  );
};
