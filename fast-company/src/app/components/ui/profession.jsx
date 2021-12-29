import { useProfessions } from "../../hooks/useProfessions";

const Profession = ({ id }) => {
    const { isLoading, getProfession } = useProfessions();

    const profession = getProfession(id);

    if (isLoading) {
        return "professions loading...";
    }

    return profession.name;
};

export { Profession };
