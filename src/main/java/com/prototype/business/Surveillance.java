package com.prototype.business;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;

import com.prototype.dao.DBAccessDAO;
import com.prototype.mapper.ResultSummaryMapper;

public class Surveillance {


	@SuppressWarnings("null")
	public ArrayList <ResultSummaryMapper> getResultSummary() throws SQLException {
		// business object
		DBAccessDAO dbAccessDAO = new DBAccessDAO();
		String sql ="select * from resultsummary";
		ArrayList<HashMap> rsMapList= dbAccessDAO.getResultSet(sql);
		//System.out.println(" rs size is "+rs.getFetchSize());
		//rs.getMetaData();
		ArrayList <ResultSummaryMapper> rsList= new ArrayList<ResultSummaryMapper>();
		ResultSummaryMapper summaryMapper=new ResultSummaryMapper();
		
		for(HashMap rsmap :rsMapList ) {
			summaryMapper=new ResultSummaryMapper();
			//System.out.println(" evtdate @@"+String.valueOf(rsmap.get("EVTDATE")));
			//int evtDate=(int) Integer.parseInt((String) rsmap.get("EVTDATE"));
			summaryMapper.setEvtDate( (int) Integer.parseInt((String) rsmap.get("EVTDATE")));
			summaryMapper.setReportDate( (int) Integer.parseInt((String) rsmap.get("REPORTDATE")));
			summaryMapper.setLastRunDate( (int) Integer.parseInt((String) rsmap.get("LASTRUNDATE")));
			summaryMapper.setControlID( (int) Integer.parseInt((String) rsmap.get("CONTROLID")));
			
			summaryMapper.setControlShortName((String)rsmap.get("CONTROLSHORTNAME"));
			summaryMapper.setControlFullName((String)rsmap.get("CONTROLFULLNAME"));
			
			summaryMapper.setTotalTradecount( Long.parseLong((String) rsmap.get("TOTALTRADECOUNT")));
			summaryMapper.setAlertCount( Long.parseLong((String) rsmap.get("ALERTCOUNT")));
			summaryMapper.setAlertPassCount( Long.parseLong((String) rsmap.get("ALERTPASSCOUNT")));
			summaryMapper.setActualFailCount( Long.parseLong((String) rsmap.get("ACTUALFAILCOUNT")));
			

			summaryMapper.setStatus((String)rsmap.get("STATUS"));
			summaryMapper.setAssignedTo((String)rsmap.get("ASSIGNEDTO"));
			summaryMapper.setIsEscalated((String)rsmap.get("ISESCALATED"));
			summaryMapper.setLastActionedBy((String)rsmap.get("LASTACTIONEDBY"));
			summaryMapper.setLastActionedOn((String)rsmap.get("LASTACTIONEDON"));
			summaryMapper.setActionHistory((String)rsmap.get("ACTIONHISTORY"));
			summaryMapper.setComments((String)rsmap.get("COMMENTS"));
			rsList.add(summaryMapper);
			
		}

		return rsList;
	}

	//for testing purpose
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
