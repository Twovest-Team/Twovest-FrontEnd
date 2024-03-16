import getAllCoupons from "@/utils/db/getAllCoupons";
import buyCoupon from "@/utils/db/buyCoupon";
import checkIfUserHasCoupon from "@/utils/db/checkIfUserHasCoupon";
import usedCoupon from "@/utils/usedCoupon";

export default async function PontosECupoes() {
  const couponData = await getAllCoupons();

  //buyCoupon(38,2)
  //usedCoupon(30,4);
  return (
    <main>
      <div className="h-[2600px] w-full">
        Olá mundo
        {couponData.map((element) => (
          <div
            className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            key={element.id}
          >
            <p>Titulo: {element.title}</p>
            <p>Descricao: {element.description}</p>
            <p>Descontos: {element.discount}</p>
            <p>Custo: {element.cost}</p>
            {element.brands.map((marca) => (
              <p key={marca.id_brand}>{marca.brandData.name}</p>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}