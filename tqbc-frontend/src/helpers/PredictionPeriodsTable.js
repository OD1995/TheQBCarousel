// import PredictionPeriodService from "../services/PredictionPeriodService";
// import EventService from "../services/EventService";
import moment from "moment-timezone";

// function getHowItWorksTable() {
//     PredictionPeriodService.getHowItWorksPredictionPeriods().then(
//         (ppRes) => {
//             // Get the example season to use (based on the DB)
//             const exampleSeasonFromDB = ppRes.data[0].season;
//             // Get unique array of eventIDs
//             const fromEventIDs = ppRes.data.map(o => o.fromEventID);
//             const toEventIDs = ppRes.data.map(o => o.toEventID);
//             const uniqueEventIDs = [...new Set([...fromEventIDs ,...toEventIDs])];
//             // Get details of events in `uniqueEventIDs`
//             EventService.getEventsByEventIDArray(uniqueEventIDs).then(
//                 (eRes) => {
//                     let tbl = createPredictionPeriodsTable(ppRes.data,eRes.data);
//                     return {
//                         tbl : tbl,
//                         ssn: exampleSeasonFromDB
//                     };
//                 }
//             )
//         }
//     )
// }

function createPredictionPeriodsTable(predictionPeriodsArray,eventArray) {
    // Create dict where key is eventID and value is row from `events`
    // let eventsDict = Object.assign({}, ...eventArray.map((x) => ({[x.eventID]: x})));
    // console.log("typea");
    // let od1 = eventArray[0].eventDateTimeUTC.slice(0,19);
    // let M = moment.utc(od1);
    // console.log(od1);
    // console.log(M);
    // console.log(M.format("DD MMM YYYY HH:mm"));
    // console.log(M.tz("America/New_York").format("DD MMM YYYY HH:mm"));
    // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

    let eventsDict = {};
    let userTZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
    for (const ev of eventArray) { // 7th Sep 2022 20:15
        let momentDate = moment.utc(
            ev.eventDateTimeUTC.slice(0,19)
        ).tz(userTZ).format("DD MMM YYYY HH:mm");
        ev.eventDateTimeUTC = momentDate;
        eventsDict["E" + ev.eventID] = ev;
    }
    // Create dict where key is predictionPeriodID and value is row from `predictionperiods`
    let predictionPeriodDict = Object.assign({}, ...predictionPeriodsArray.map(
        (x) => ({["PP" + x.predictionPeriodID]: x}))
    );
    // Combine the two dicts
    let bothDict = Object.assign({}, eventsDict, predictionPeriodDict);
    // let bothDict = {...eventsDict, ...Pred}

    let rowsArray = [];
    for (const [ix,predictionPeriod] of predictionPeriodsArray.entries()) {
        // If it's the first prediction period of a season, add `fromEventID` to `rowsArray`
        // if ((ix == 0) || (rowsArray[-1] !== fromEventID)) {
        if (predictionPeriod.seasonPeriodID === 1) {
            rowsArray.push({
                id: "E" + predictionPeriod.fromEventID,
                image: true
            });
        }
        rowsArray.push({
            id: "PP" + predictionPeriod.predictionPeriodID,
            image: false
        });
        rowsArray.push({
            id: "E" + predictionPeriod.toEventID,
            image: predictionPeriod.seasonPeriodID !== 4
        });
    }
    // console.log("rowsArray");
    // console.log(rowsArray);
    // console.log("bothDict");
    // console.log(bothDict);
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
                    rowsArray.map(
                        (rowIDDict,ix) => createPredictionPeriodTableRow(rowIDDict,bothDict,ix,rowsArray.length)
                    )
                }
            </tbody>
        </table>
    )

    return ppTable;
}

function createPredictionPeriodTableRow(rowIDDict,bothDict,rowArrayIndex,totalRows) {
    const rowID = rowIDDict.id;
    const firstEvent = rowArrayIndex === 0;
    const lastEvent = rowArrayIndex + 1 === totalRows;
    if (rowID[0] === "E") {
        const returnMe = [];

        if (firstEvent) {
            const txtRow = (
                <tr key={rowID + "-row"}>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td></td>
                    <td className="border-tlb" rowSpan={2}>{bothDict[rowID].eventName}</td>
                    <td className="border-trb" rowSpan={2}>{bothDict[rowID].eventDateTimeUTC}</td>
                </tr>
            );
            returnMe.push(txtRow);
        } else if (lastEvent) {
            const txtRow1 = (
                <tr key={rowID + "-row1"}>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td className="border-tlb" rowSpan={2}>{bothDict[rowID].eventName}</td>
                    <td className="border-trb" rowSpan={2}>{bothDict[rowID].eventDateTimeUTC}</td>
                </tr>
            );
            const txtRow2 = (
                <tr key={rowID + "-row2"}>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                </tr>
            );
            returnMe.push(txtRow1);
            returnMe.push(txtRow2);
        } else {
            const txtRow = (
                <tr key={rowID + "-row"}>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td className="border-tlb" rowSpan={2}>{bothDict[rowID].eventName}</td>
                    <td className="border-trb" rowSpan={2}>{bothDict[rowID].eventDateTimeUTC}</td>
                </tr>
            )
            returnMe.push(txtRow);           
        }

        if (rowIDDict.image) {
            if (firstEvent) {
                const imageRow = (
                    <tr key={rowID + "-image"}>
                        <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                        <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                        <td rowSpan={3}>
                            <img
                                src={window.location.origin + '/arrows.png'}
                                alt="from-to-arrow"
                                className="arrows arrow-col"
                            />
                        </td>
                    </tr>
                );
                returnMe.push(imageRow)
            } else {
                const imageRow = (
                    <tr key={rowID + "-image"}>
                        <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                        <td rowSpan={3}>
                            <img
                                src={window.location.origin + '/arrows.png'}
                                alt="from-to-arrow"
                                className="arrows arrow-col"
                            />
                        </td>
                    </tr>
                );
                returnMe.push(imageRow)
            }
        }
        return returnMe;

    } else if (rowID === "PP1") {
        return (
            <tr key={rowID}>
                <td className="ps-col ps-val" rowSpan={10}>{bothDict[rowID].season}</td>
                <td>{"PP" + bothDict[rowID].predictionPeriodID}</td>
                <td></td>
                <td></td>
            </tr>
        )
    } else {
        return (
            <tr key={"other-" + rowID}>
                <td>{"PP" + bothDict[rowID].predictionPeriodID}</td>
                <td></td>
                <td></td>
            </tr>
        )
    }
}

export default createPredictionPeriodsTable;