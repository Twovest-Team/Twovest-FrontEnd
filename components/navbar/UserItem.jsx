'use client'

import Image from "next/image";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Button from "../buttons/Button";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import { useAppDispatch } from "@/redux/hooks";
import { changeUserData } from "@/redux/slices/userSlice";
import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from 'next/navigation'
import { openModal } from "@/redux/slices/modalSlice";
import IconButton from "@/components/buttons/icons/IconButton";
import Avatar from "@/components/user/Avatar";



const UserItem = ({ user }) => {

  const dispatch = useAppDispatch();
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      dispatch(changeUserData(user))
    }
  }, [user])

  const renderImage = () => (
    <Menu.Button>
      <Avatar user={user} size='md' noLink={true} />
    </Menu.Button>

  )

  const renderRegisterButton = () => (
    <>

      <IconButton
        className="sm:hidden"
        icon={<AccountCircleOutlinedIcon sx={{ fontSize: 26 }} />}
        onClick={() => dispatch(openModal('authModal'))}>
      </IconButton>

      <Button
        className='hidden sm:flex text-sm ml-1'
        height="40px"
        onClick={() => dispatch(openModal('authModal'))}
        type="black"
        ariaLabel="Fazer login ou registo"
        width="fit-content"
        padding="0 1.8rem"
      >
        <span className="text-caption"> Login | Registar</span>
      </Button>

    </>
  )

  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(changeUserData(null));
    router.refresh()
  }

  const renderItems = () => {

    const userMenuItems = [
      [
        {
          title: 'Perfil',
          link: `/profile/${user.id}`
        },
        {
          title: 'Pontos&Cupões',
          link: `/profile/${user.id}/coupons`,
          icon: <AutoModeIcon className=" h-5 w-5 mr-1.5" />
        },
      ],
      [
        {
          title: 'Submeter novo look',
          link: '/gallery/submit',
          icon: <ArrowCircleUpIcon className="h-5 w-5 mr-1.5" />
        },
        {
          title: 'Gerir os meus looks',
          link: `/profile/${user.id}?option=looks`,
        },
        {
          title: 'Ver as minhas coleções',
          link: `/profile/${user.id}?option=coleções`
        },
      ],
      [
        {
          title: 'Histórico de compras',
          link: `/profile/${user.id}/orders`,
        },
        {
          title: 'Definições de conta',
          link: `/profile/${user.id}/options`,
        },
        {
          title: 'Sair ->',
          link: '?logout=true',
          onClick: handleLogout,
          className: 'text-error_main'
        },
      ]

    ]

    return userMenuItems.map((section, index) => (
      <>
        {section.map(item => (
          <Menu.Item key={item.title}>
            {({ active, close }) => (
              <Link
                href={item.link}
                onClick={item.onClick || close}
                className={`w-full ${active && "bg-grey_opacity_50"}`}
              >
                <div className={`${item.className} bg-white text-caption flex items-center my-0.5 py-2 px-3 transition rounded hover:bg-grey_opacity_50 duration-75`}>
                  {item.icon}
                  {item.title}
                </div>
              </Link>
            )}
          </Menu.Item>
        ))}

        {(index + 1) < userMenuItems.length && <div className="border-b border-grey my-3" />}
      </>

    ))
  }

  return (
    <Menu>
      {user && renderImage()}
      {!user && renderRegisterButton()}

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items
          className={
            "absolute flex-wrap bg-white mt-7 border border-grey_opacity_50 px-4 py-4 w-[220px] right-1 shadow-lg rounded"
          }
        >
          {user && (
            <>
              <Menu.Item className="mb-2 w-full">
                {({ close }) => (
                  <div className='font-semibold'>

                    <Link
                      href={`/profile/${user.id}`}
                      onClick={close}
                      className="w-full text-wrap text-[16px] duration-75 py-1.5 px-2 transition rounded  hover:transition block"
                    >
                      {user.name}
                    </Link>

                    <div className="bg-primary_main px-1 py-2 h-[32px] mx-2 text-center text-caption mt-1 mb-2 text-white rounded">
                      ID: {user.id}
                    </div>
                  </div>
                )}
              </Menu.Item>


              {renderItems()}

            </>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default UserItem
