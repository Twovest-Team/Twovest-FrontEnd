import Image from "next/image";
import Link from "next/link";

const Avatar = ({ user, size, noLink }) => {

  if (!user) return null
  const { img, role, name, id, provider } = user;

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
      case 'profile':
        return 140
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
      case 'profile':
        return 36
    }
  }

  const renderImage = () => (
    <>
      <figure
        className="relative aspect-square rounded-full"
        style={{
          width: `${imageSize()}px`
        }}
      >
        <Image
          className={`rounded-full bg-grey_opacity_50 object-cover ${size === 'profile' ? 'border-[7px] border-white' : 'border-2 border-grey_opacity_50 hover:border-grey'}  transition-colors duration-200`}
          fill={true}
          src={img}
          alt={`Perfil de ${name}`}
        />
      </figure>

      {role === 1 &&
        <div className={`absolute ${size === 'profile' ? 'bottom-1 right-2' : '-bottom-0.5 -right-0.5'}`}>
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
    </>
  )

  if (noLink) {
    return (
      <div className="relative">
        {renderImage()}
      </div>
    )
  } else {
    return (
      <Link className="relative" href={`/profile/${id}`}>

        {renderImage()}
      </Link>
    )
  }


};


export default Avatar