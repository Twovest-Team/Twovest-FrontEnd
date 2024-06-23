"use client";

import ShareIcon from "@mui/icons-material/Share";
import { usePathname } from "next/navigation";
import { CopyToClipboard } from "react-copy-to-clipboard";
import IconButton from "./IconButton";
import { useAppDispatch } from "@/redux/hooks";
import { showNotification } from "@/redux/slices/notificationSlice";
import PropTypes from "prop-types";
import Button from "../Button";

const ShareButton = ({type}) => {
  const dispatch = useAppDispatch();
  const pathName = usePathname();
  const url = process.env.NEXT_PUBLIC_URL + pathName;

  const handleClick = () => {
    dispatch(showNotification("shareButton"));
  }

  const renderButton = () => {
    if (!type) return null

    if (type === 'normal') return (
      <IconButton icon={<ShareIcon sx={{fontSize: 20}} />} ariaLabel="Partilhar esta página." />
    )

    if (type === 'bordered') return (
      <Button className="shadow border border-grey_opacity_50" padding='16px' onlyIcon={true} type="white" ariaLabel="Partilhar esta página.">
        <ShareIcon />
      </Button>
    )

  }

  return (
    <div className="cursor-pointer">
      <CopyToClipboard text={url} onCopy={() => handleClick()}>
        <div>
         {renderButton()}
        </div>
      </CopyToClipboard>
    </div>
  );
};

ShareButton.propTypes = {
  type: PropTypes.oneOf([
    "normal",
    "bordered",
  ]).isRequired,
}

export default ShareButton;
