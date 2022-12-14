import { useState } from "react"
import { useEffect } from "react"
import { range } from "../../helpers/UsefulFunctions";

export const PageSelectorComponent = (props) => {

    const [pageButtons, setPageButtons] = useState([]);

    useEffect(
        () => {
            setPageButtons(createPageButtons());
        },
        [props]
    )

    const createPageButtons = () => {
        let page_buttons = [];
        for (const i of range(props.pageCount)) {
            let classN = 'page-button';
            if (props.currentPage === (i + 1)) {
                classN += " selected-page-button";
            } else {
                classN += " unselected-page-button";
            }
            page_buttons.push(
                <button
                    key={"page-button-" + (i + 1)}
                    className={classN}
                    onClick={() => props.updatePageNumber(i+1)}
                >
                    {i + 1}
                </button>
            )
        }
        return page_buttons;
    }

    return (
        <div
            id="page-selector-div"
        >
            {pageButtons}
        </div>
    )
}