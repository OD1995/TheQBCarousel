import { useNavigate } from "react-router-dom"
import History from "./History"

export const NavigateSetter = () => {
    History.navigate = useNavigate();

    return null;
}