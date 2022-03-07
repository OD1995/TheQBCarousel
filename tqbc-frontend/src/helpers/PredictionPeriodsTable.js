import PredictionPeriodService from "../services/PredictionPeriodService";
import EventService from "../services/EventService";

function getHowItWorksTable() {
    PredictionPeriodService.getHowItWorksPredictionPeriods().then(
        (ppRes) => {
            // console.log(ppRes.data)
            // Get the example season to use (based on the DB)
            const exampleSeasonFromDB = ppRes.data[0].season;
            // Get unique array of eventIDs
            const fromEventIDs = ppRes.data.map(o => o.fromEventID);
            const toEventIDs = ppRes.data.map(o => o.toEventID);
            const uniqueEventIDs = [...new Set([...fromEventIDs ,...toEventIDs])];
            // Get details of events in `uniqueEventIDs`
            EventService.getEventsByEventIDArray(uniqueEventIDs).then(
                (eRes) => {
                    // console.log(eRes.data)
                    let tbl = createPredictionPeriodsTable(ppRes.data,eRes.data);
                    console.log('hello');
                    console.log(tbl);
                    return {
                        tbl : tbl,
                        ssn: exampleSeasonFromDB
                    };
                }
            )
        }
    )
}

function createPredictionPeriodsTable(predictionPeriodsArray,eventArray) {
    // Create dict where key is eventID and value is row from `events`
    let eventsDict = Object.assign({}, ...eventArray.map((x) => ({[x.eventID]: x})));
    // Create dict where key is predictionPeriodID and value is row from `predictionperiods`
    let predictionPeriodDict = Object.assign({}, ...predictionPeriodsArray.map(
        (x) => ({[x.predictionPeriodID]: x}))
    );
    // Combine the two dicts
    let bothDict = Object.assign({}, eventsDict, predictionPeriodDict);
    // let bothDict = {...eventsDict, ...Pred}

    console.log(bothDict);
    let rowsArray = [];
    for (const [ix,predictionPeriod] of predictionPeriodsArray.entries()) {
        // If it's the first prediction period of a season, add `fromEventID` to `rowsArray`
        // if ((ix == 0) || (rowsArray[-1] !== fromEventID)) {
        if (predictionPeriod.seasonPeriodID === "SP1") {
            rowsArray.push({
                id: predictionPeriod.fromEventID,
                image: true
            });
        }
        rowsArray.push({
            id: predictionPeriod.predictionPeriodID,
            image: false
        });
        rowsArray.push({
            id: predictionPeriod.toEventID,
            image: predictionPeriod.seasonPeriodID !== "SP4"
        });
    }
    console.log(rowsArray);

    const ppTable = (
        <table cellSpacing={0} cellPadding={0}>
            <tbody>
                <tr>
                    <th className="display-linebreak ps-col">Prediction{"\n"}Season</th>
                    <th className="display-linebreak">Prediction{"\n"}Period</th>
                    <th className="display-linebreak arrow-col">From{"\n"}To</th>
                    <th>Event</th>
                    <th>Date</th>
                </tr>
                {
                    rowsArray.map(rowIDDict => createPredictionPeriodTableRow(rowIDDict,bothDict))
                }
            </tbody>
        </table>
    )

    return ppTable;
}

function createPredictionPeriodTableRow(rowIDDict,bothDict) {
    const rowID = rowIDDict.id;
    if (rowID[0] === "E") {
        const returnMe = [
            <tr key={rowID + "-row"}>
                <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                <td></td>
                <td className="border-tlb" rowSpan={2}>{bothDict[rowID].eventName}</td>
                <td className="border-trb" rowSpan={2}>{bothDict[rowID].eventDateTimeUTC}</td>
            </tr>
        ]
        if (rowIDDict.image) {
            const imageRow = (
                <tr key={rowID + "-image"}>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td dangerouslySetInnerHTML={{__html:"&nbsp;"}}></td>
                    <td rowSpan={3}>
                        <img
                            src={window.location.origin + '/arrows.png'}
                            className="arrows arrow-col"
                        />
                    </td>
                </tr>
            );
            returnMe.push(imageRow)
        }
        return returnMe;

    } else {
        return (
            <tr>
                <td className="ps-col ps-val" rowSpan={4}>{bothDict[rowID].season}</td>
                <td>{bothDict[rowID].predictionPeriodID}</td>
                <td></td>
                <td></td>
            </tr>
        )
    }
}

export default getHowItWorksTable;