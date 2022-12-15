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

    const generatePageButton = (pgNumber) => {
        let classN = 'page-button';
        if (props.currentPage === pgNumber) {
            classN += " selected-page-button";
        } else {
            classN += " unselected-page-button";
        }
        if (pgNumber === "~") {
            classN += " no-hover"
        }
        var txt = pgNumber;
        let pb = (
            <button
                key={"page-button-" + pgNumber}
                className={classN}
                onClick={() => props.updatePageNumber(pgNumber)}
            >
                {txt}
            </button>
        )
        return pb;
    }

    const createPageButtons = () => {
        let page_buttons = [];
        if (props.pageCount <= 5) {
            for (const i of range(props.pageCount)) {
                page_buttons.push(generatePageButton(i+1))
            }
        } else {
            // c - current page, n - total pages
            // Always have button for:
            //  a - page 1
            //  b - page c-1
            //  c - page c
            //  d - page c+1
            //  e - page n
            // If there's gap between a&b or d&e, have non-clickable button divider
            var pgNumber = 1;
            page_buttons.push(generatePageButton(1));
            pgNumber += 1;
            if (props.currentPage !== 3) {
                page_buttons.push(generatePageButton("~"));
            }
            for (const ix of [-1,0,1]) {
                page_buttons.push(generatePageButton(props.currentPage+ix));
            }
            if (props.currentPage + 1 !== props.pageCount - 1) {
                page_buttons.push(generatePageButton("~"));
            }
            page_buttons.push(generatePageButton(props.pageCount));
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