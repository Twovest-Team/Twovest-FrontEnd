import Views from "@/components/providers/Views";
import ItemsBox from "@/components/providers/ItemsBox";
import LookCard from "@/components/cards/LookCard";
import CollectionPreview from "@/components/items/CollectionPreview";



// Página com todos os looks da galeria
// Atenção, carregar 30 looks de cada vez (por exemplo) infinite scroll
// Exemplo: twovest.com/gallery/mulher
const Gallery = () => {
  return (
    <main>
      <div className="container flex justify-between h-7">
      <Views />
      </div>
      
      <ItemsBox>
        <LookCard />
        <LookCard />
        <LookCard />
        <LookCard />
        
      </ItemsBox>


    </main>
  )
}

export default Gallery