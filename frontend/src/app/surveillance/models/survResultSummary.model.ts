export interface ISurvResultSummary {
    evtDate: Date;
    reportDate: Date;
    lastRunDate: Date;
    controlID: number;
    controlShortName: string;
    controlFullName: string;
    totalTradecount: number;
    alertCount: number;
    alertPassCount: number;
    actualFailCount: number;
    status: string;
    assignedTo: string;
    isEscalated: string;
    lastActionedBy: string;
    lastActionedOn: Date;
    actionHistory: string;
    comments: string;
}


