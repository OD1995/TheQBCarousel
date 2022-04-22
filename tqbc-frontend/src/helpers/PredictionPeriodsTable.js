import moment from "moment-timezone";


function createPredictionPeriodsTable2(predictionPeriodsData) {
    // Every element in predictionPeriodsData (which is essentially a row from PredictionPeriods)
    //    should create their "from event" row and their image row
    // Except the final element, which should create "from event" row, image row and "to event" row 

    const ppTable = (
        <table cellSpacing={0} cellPadding={0}>
            <tbody>
                <tr key="column-headers">
                    <th className="display-linebreak ps-col">Prediction{"\n"}Season</th>
                    <th className="display-linebreak">Prediction{"\n"}Period</th>
                    <th className="display-linebreak arrow-col">From{"\n"}To</th>
                    <th>Event</th>
                    <th className="display-linebreak">Date{"\n"}(In Your Timezone:{"\n"}{Intl.DateTimeFormat().resolvedOptions().timeZone})</th>
                </tr>
                {
                    predictionPeriodsData.map(
                        (element,ix) => createPredictionPeriodTableRow2(element,ix,predictionPeriodsData.length)
                    )
                }
            </tbody>
        </table>
    )

    return ppTable;
}

function createPredictionPeriodTableRow2(element,ix,elementCount) {
    let isFirstPP = ix === 0;
    let isLastPP = ix + 1 === elementCount;
    let predictionPeriodID = element.predictionPeriodID;

    if (isFirstPP) {
        let fromEventRow = (
            <tr key={predictionPeriodID + "-fromEventRow"} id={predictionPeriodID + "-fromEventRow"}>
                <td dangerouslySetInnerHTML={{__html:"&nbsp;"}} rowSpan={2}></td>
                <td dangerouslySetInnerHTML={{__html:"&nbsp;"}} rowSpan={2}></td>
                <td></td>
                <td className="border-tlb" rowSpan={2}>{element.fromEvent.eventName}</td>
                <td className="border-trb" rowSpan={2}>{beautifyDate(element.fromEvent.eventDateTimeUTC)}</td>
            </tr>
        );
        let imageRow = (
            <tr key={predictionPeriodID + "-imageRow"} id={predictionPeriodID + "-imageRow"}>
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
            <tr key={predictionPeriodID + "-ppRow"} id={predictionPeriodID + "-ppRow"}>
                <td className="ps-col ps-val" rowSpan={10}>{element.season}</td>
                <td>{"PP" + element.predictionPeriodID}</td>
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
            <tr key={predictionPeriodID + "-fromEventRow"} id={predictionPeriodID + "-fromEventRow"}>
                <td dangerouslySetInnerHTML={{__html:"&nbsp;"}} rowSpan={2}></td>
                <td className="border-tlb" rowSpan={2}>{element.fromEvent.eventName}</td>
                <td className="border-trb" rowSpan={2}>{beautifyDate(element.fromEvent.eventDateTimeUTC)}</td>
            </tr>
        );
        var imageRow = (
            <tr key={predictionPeriodID + "-imageRow"} id={predictionPeriodID + "-imageRow"}>
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
            <tr key={predictionPeriodID + "-ppRow"} id={predictionPeriodID + "-ppRow"}>
                <td>{"PP" + element.predictionPeriodID}</td>
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
                <tr key={predictionPeriodID + "-toEventRow1"} id={predictionPeriodID + "-toEventRow1"}>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}} rowSpan={2}></td>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}} rowSpan={2}></td>
                    <td className="border-tlb" rowSpan={2}>{element.toEvent.eventName}</td>
                    <td className="border-trb" rowSpan={2}>{beautifyDate(element.toEvent.eventDateTimeUTC)}</td>
                </tr>
            );
            let toEventRow2 = (
                <tr key={predictionPeriodID + "-toEventRow2"} id={predictionPeriodID + "-toEventRow2"}>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                </tr>
            );
            returnMe.push(toEventRow1);
            returnMe.push(toEventRow2);
        }
        return returnMe;

    }

}

function beautifyDate(date) {
    let userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let momentDate = moment.utc(
        date.slice(0,19)
    ).tz(userTZ).format("DD MMM YYYY HH:mm");
    return momentDate;
}
export default createPredictionPeriodsTable2;