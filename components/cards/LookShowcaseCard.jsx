
import Button from "@/components/buttons/Button";
import Image from "next/image";

const LookShowcaseCard = ({ title, subtitle, btnText, btnLink, src }) => {
    return (
        <div className="container my-14">
            <div className='bg-white relative flex rounded h-[600px] md:h-[500px] lg:h-[650px] xl:h-[550px] md:flex md:max-w-none shadow-lg items-center'>

                <div className="absolute bottom-0 text-white md:text-black md:relative flex flex-col gap-6 flex-grow p-4 pb-6 md:p-5 lg:px-14 z-20">
                    <div className='flex flex-col gap-1'>
                        <p className="text-h6">{title}</p>
                        <p className="text-h3 lg:text-h1 leading-tight">{subtitle}</p>
                    </div>

                    <Button className="hidden md:flex " type='black' href={btnLink}>
                        {btnText}
                    </Button>

                    <Button className="md:hidden " type='white' href={btnLink}>
                        {btnText}
                    </Button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 w-full h-2/3 bg-gradient-to-t opacity-50 from-black z-10 md:hidden" />

                <div className="absolute left-0 right-0 bottom-0 top-0 w-full h-full md:w-fit md:relative">
                    <figure className='relative w-full h-full md:w-auto md:aspect-[17/28] lg:aspect-[17/26] xl:aspect-[17/20]'>
                        <Image className="object-cover rounded md:rounded-l-[0px]" fill={true} src={src} alt={title} />
                    </figure>
                </div>

            </div>
        </div>

    )
}

export default LookShowcaseCard