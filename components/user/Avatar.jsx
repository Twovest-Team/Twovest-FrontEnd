import Image from "next/image";
import Link from "next/link";

export const Avatar = ({ user, size}) => {

  const {img, role, name, id, provider} = user;

  const imageSize = () => {
    switch (size) {
      case 'sm':
        return 30
      case 'md':
        return 35
      case 'lg':
        return 45
      case 'xl':
        return 55
      case '2xl':
        return 65
    }
  }

  const iconSize = () => {
    switch (size) {
      case 'sm':
        return 15
      case 'md':
        return 18
      case 'lg':
        return 20
      case 'xl':
        return 22
      case '2xl':
        return 25
    }
  }

  return (
    <Link className="relative" href={`/profile/${id}`}>

      <figure
        className="relative aspect-square"
        style={{
          width: `${imageSize()}px`
        }}
      >
        <Image
          className="rounded-full bg-grey_opacity_50 object-cover border-2 border-grey_opacity_50 hover:border-grey transition-colors duration-200"
          fill={true}
          src={img}
          alt={`Perfil de ${name}`}
        />
      </figure>

      {role === 1 &&
        <div className='absolute -bottom-0.5 -right-0.5'>
          <figure
            className="relative aspect-square"
            style={{
              width: `${iconSize()}px`
            }}
          >
            <Image fill={true} src={'/static/images/icons/verifiedIcon.svg'} />
          </figure>
        </div>
      }


    </Link>
  )

};
