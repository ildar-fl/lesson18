import _ from "lodash";

export function paginate(items, page, itemPerPage) {
    const startIndex = (page - 1) * itemPerPage;

    return _(items).slice(startIndex).take(itemPerPage).value();
}
