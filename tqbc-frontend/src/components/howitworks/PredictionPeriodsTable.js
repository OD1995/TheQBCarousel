import { useState } from "react";
import moment from "moment-timezone";
import { useEffect } from "react";

export const PredictionPeriodsTable = (props) => {
    // Every element in predictionPeriodsData (which is essentially a row from PredictionPeriods)
    //    should create their "from event" row and their image row
    // Except the final element, which should create "from event" row, image row and "to event" row 

    const [unconfirmedDatesDisplayed,setUnconfirmedDatesDisplayed] = useState(false);
    const [tableRows, setTableRows] = useState([]);

    const createPredictionPeriodTableRow = (element,ix,elementCount) => {
        let isFirstPP = ix === 0;
        let isLastPP = ix + 1 === elementCount;
        let predictionPeriodID = element.predictionPeriodID;
    
        if (isFirstPP) {
            let fromEventRow = (
                <tr
                    key={predictionPeriodID + "-fromEventRow"}
                    id={predictionPeriodID + "-fromEventRow"}
                    class="ppt-tr"
                >
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}} rowSpan={2}></td>
                    <td className="empty-td" dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td></td>
                    <td className="border-lb event-td" rowSpan={2}>{element.fromEvent.eventName}</td>
                    <td className="border-rb" rowSpan={2}>{beautifyDate(element.fromEvent)}</td>
                </tr>
            );
            let imageRow = (
                <tr
                    key={predictionPeriodID + "-imageRow"}
                    id={predictionPeriodID + "-imageRow"}
                    class="ppt-tr"
                >
                    <td className="empty-td" dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td rowSpan={3}>
                        <img
                            src={window.location.origin + '/arrows.png'}
                            alt="from-to-arrow"
                            className="arrows arrow-col"
                        />
                    </td> 
                </tr>
            );
            let ppRow = (
                <tr
                    key={predictionPeriodID + "-ppRow"}
                    id={predictionPeriodID + "-ppRow"}
                    class="ppt-tr"
                >
                    <td className="ps-col ps-val" rowSpan={10}>{element.season}</td>
                    <td className="sp-val">{"SP" + element.seasonPeriodID}</td>
                    <td></td>
                    <td></td>
                </tr>
            );
            return [
                fromEventRow,
                imageRow,
                ppRow
            ];
        } else {
            var fromEventRow = (
                <tr
                    key={predictionPeriodID + "-fromEventRow"}
                    id={predictionPeriodID + "-fromEventRow"}
                    class="ppt-tr"
                >
                    <td className="empty-td" dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td className="border-tlb event-td" rowSpan={2}>{element.fromEvent.eventName}</td>
                    <td className="border-trb" rowSpan={2}>{beautifyDate(element.fromEvent)}</td>
                </tr>
            );
            var imageRow = (
                <tr
                    key={predictionPeriodID + "-imageRow"}
                    id={predictionPeriodID + "-imageRow"}
                    class="ppt-tr"
                >
                    <td className="empty-td" dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td rowSpan={3}>
                        <img
                            src={window.location.origin + '/arrows.png'}
                            alt="from-to-arrow"
                            className="arrows arrow-col"
                        />
                    </td> 
                </tr>
            );
            var ppRow = (
                <tr
                    key={predictionPeriodID + "-ppRow"}
                    id={predictionPeriodID + "-ppRow"}
                    class="ppt-tr"
                >
                    <td>{"SP" + element.seasonPeriodID}</td>
                    <td></td>
                    <td></td>
                </tr>
            );
            var returnMe = [
                fromEventRow,
                imageRow,
                ppRow
            ];
            if (isLastPP) {
                let toEventRow1 = (
                    <tr
                        key={predictionPeriodID + "-toEventRow1"}
                        id={predictionPeriodID + "-toEventRow1"}
                        class="ppt-tr"
                    >
                        <td dangerouslySetInnerHTML={{__html:"&nbsp;"}} rowSpan={2}></td>
                        <td className="empty-td" dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                        <td className="border-tlb event-td" rowSpan={2}>{element.toEvent.eventName}</td>
                        <td className="border-trb" rowSpan={2}>{beautifyDate(element.toEvent)}</td>
                    </tr>
                );
                let toEventRow2 = (
                    <tr
                        key={predictionPeriodID + "-toEventRow2"}
                        id={predictionPeriodID + "-toEventRow2"}
                        class="ppt-tr"
                    >
                        <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    </tr>
                );
                returnMe.push(toEventRow1);
                returnMe.push(toEventRow2);
            }
            return returnMe;
    
        }
    }

    const beautifyDate = (event) => {
        let date = event.eventDateTimeUTC;
        let userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let momentDate = moment.utc(
            date.slice(0,19)
        ).tz(userTZ).format("DD MMM YYYY HH:mm");
        if (event.dateConfirmed) {
            return momentDate;
        } else {
            setUnconfirmedDatesDisplayed(true);
            return momentDate + "*";
        }
    }

    useEffect(
        () => {
            let table_rows = [];
            props.predictionPeriodsData.map(
                (element,ix) => {
                    table_rows.push(
                        createPredictionPeriodTableRow(element,ix,props.predictionPeriodsData.length)
                    )
                }
            )
            setTableRows(table_rows);
        },
        []
    )

    return (
        <div>
            <table id="how-it-works-table" cellSpacing={0} cellPadding={0}>
                <tbody>
                    <tr key="column-headers">
                        <th className="display-linebreak ps-col heading-tlb-border">
                            Prediction{"\n"}Season
                        </th>
                        <th className="display-linebreak heading-tlb-border">
                            Season{"\n"}Period
                        </th>
                        <th className="display-linebreak arrow-col heading-tlb-border">
                            From{"\n"}To
                        </th>
                        <th className="heading-tlb-border">
                            Event
                        </th>
                        <th className="display-linebreak heading-tbr-border">
                            Date{"\n"}(In Your Timezone:{"\n"}{Intl.DateTimeFormat().resolvedOptions().timeZone})
                        </th>
                    </tr>
                    {tableRows}
                </tbody>
            </table>
            {unconfirmedDatesDisplayed && (
                <div
                    style={{fontSize: '13px'}}
                >
                    *Event's date/time not yet confirmed
                </div>
            )}
        </div>
    )
}