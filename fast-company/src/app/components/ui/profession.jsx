import { useSelector } from "react-redux";
import {
    getProfessionById,
    getStateLoadingProfessions
} from "../../store/professions";

const Profession = ({ id }) => {
    const isLoading = useSelector(getStateLoadingProfessions);
    const profession = useSelector(getProfessionById(id));

    if (isLoading) {
        return "professions loading...";
    }

    return profession.name;
};

export { Profession };
