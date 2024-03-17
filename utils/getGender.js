import { genders } from "@/constants";

export default function getGender(param){
    return genders.find(object => object.id == param || object.string == param)
}