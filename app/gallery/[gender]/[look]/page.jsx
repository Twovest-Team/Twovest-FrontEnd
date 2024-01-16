
// Página de um look em específico

import NavigationTitle from "@/components/providers/NavigationTitle"
import getLookById from "@/utils/db/getLookById"
import Image from "next/image"
import ForwardOutlinedIcon from "@mui/icons-material/ForwardOutlined";
import SaveButton from "@/components/buttons/icons/SaveButton";

// Exemplo: twovest.com/gallery/mulher/253  <-id do look
const Look = async ({ params }) => {
  // const lookId = params.look
  const lookId = 22

  const data = await getLookById(lookId)
  console.log(data)
  return (
    <main>
      {/* <section className="bg-red-300">

        <div className="relative">

          <figure className="h-[calc(100vh-128px)] flex flex-col relative">
            <div className="z-20">
              <NavigationTitle hasImageBehind={true}>
                <div className="flex flex-col items-center justify-center translate-x-2">
                  <ForwardOutlinedIcon sx={{ fontSize: 28 }} className="text-white -rotate-90" />
                  {
                    data.upvotes > 0 && <p>{data.upvotes}</p>
                  }
                </div>
              </NavigationTitle>
            </div>
            <div className="bg-gradient-to-b from-dark opacity-70 absolute top-0 z-10 w-full h-1/5" />
            <Image className="object-cover" fill={true} src={data.url_image} />

            <div className="absolute container bottom-14 left-0 right-0 text-white flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <Image className="rounded-full" width={40} height={40} src={data.users.img} />
                <p>{data.users.name}</p>
              </div>
              <SaveButton />
            </div>

            <div className="bg-gradient-to-t from-dark opacity-70 absolute bottom-0 w-full h-1/5" />
          </figure>

          <section className="absolute container px-8 rounded-t-[28px] bg-white">
            <h6 className="font-semibold">Peças Utilizadas</h6>
            <h6 className="font-semibold">Peças Utilizadas</h6>
            <h6 className="font-semibold">Peças Utilizadas</h6>
          </section>

        </div>




      </section> */}

      <section className="h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${data.url_image})` }}>
        <div className="z-20">
          <NavigationTitle hasImageBehind={true}>
            <div className="flex flex-col items-center justify-center translate-x-2">
              <ForwardOutlinedIcon sx={{ fontSize: 28 }} className="text-white -rotate-90" />
              {
                data.upvotes > 0 && <p>{data.upvotes}</p>
              }
            </div>
          </NavigationTitle>
        </div>
      </section>

    </main>
  )
}

export default Look