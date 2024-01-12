import SuccessCard from '@/components/cards/SuccessCard'
import Link from 'next/link'

const page = () => {
  return (
    <main className='h-screen bg-grey_opacity_50 flex justify-center items-center'>
      <SuccessCard>
        <div className='flex flex-col gap-6'>
          <div>
            <p className='font-semibold mb-2'>Pagamento efetuado com sucesso</p>
            <p className='text-secondary'>Obrigado por comprar na Twovest</p>
          </div>

          {/* Se ganhar pontos... v */}
          <div className='border container rounded border-grey py-6 flex flex-col gap-3'>
              <h5 className='font-semibold text-primary_main'>+ 200</h5>
              <p className='text-secondary'>Podes fazer uso destes pontos para adquirir cupões.</p>
              <p className='flex items-center gap-1 justify-center font-semibold'>Total de pontos: <span className='text-primary_main'>350</span></p>
          </div>
          {/* Se ganhar pontos... ^ */}

          <Link href={'/'} className="bg-primary_main block text-center text-white py-3.5 font-semibold rounded">
            Voltar à loja
          </Link>
        </div>


      </SuccessCard>
    </main>
  )
}

export default page