import Views from "@/components/Views";
import ItemsBox from "@/components/ItemsBox";
import LookCard from "@/components/LookCard";


// Página com todos os looks da galeria
// Atenção, carregar 30 looks de cada vez (por exemplo) infinite scroll
// Exemplo: twovest.com/gallery/mulher
const Gallery = () => {
  return (
    <main>
      <div className="container flex justify-between">
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