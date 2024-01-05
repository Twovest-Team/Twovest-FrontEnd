import setLocalStorage from "@/utils/localStorage/setLocalStorage";

export default function handleGender(gender){
    setLocalStorage('gender', gender)
  }