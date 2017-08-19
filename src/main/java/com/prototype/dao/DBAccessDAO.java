package com.prototype.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;

public class DBAccessDAO {

	private Properties prop = null;
	private Connection connection=null;
	private Statement statement=null;
	private static final String DRIVER="oracle.jdbc.driver.OracleDriver";
	private static final String URL="jdbc:oracle:thin:@localhost:1521:xe";
	private static final String USER="paru";
	private static final String PWD="1234";

	/*DBAccessDAO(){

	}*/



	@SuppressWarnings("rawtypes")
	public ArrayList<HashMap> getResultSet(String sql) throws SQLException{
		//ArrayList<String> alist=new ArrayList<String>();
		ResultSet rs=null;
		Statement stmt=null;
		Connection con=null;
		ArrayList <HashMap> rsMapList = new ArrayList<HashMap>(); 
		try{  
			//step1 load the driver class  
			Class.forName(DRIVER);  

			//step2 create  the connection object  
			con=DriverManager.getConnection(URL,USER,PWD);  

			//step3 create the statement object  

			stmt=con.createStatement();  
			System.out.println(" sql is @@@@"+sql); 
			//step4 execute query  
			rs=stmt.executeQuery(sql);  
			
			ArrayList <String> colmName = new ArrayList<String>(); 
			
			
			
			for (int i=1;i<=rs.getMetaData().getColumnCount();i++) {
				colmName.add(rs.getMetaData().getColumnName(i));
				
				//System.out.println(" rs.getMetaData().getColumnCount() @@@@"+rs.getMetaData().getColumnName(i)); 
			}
			
			//System.out.println(" rs.getMetaData().getColumnCount() @@@@"+rs.getMetaData().getColumnName(1)); 
			
			while(rs.next()) {  
				HashMap <String,Object> hmap = new HashMap<String,Object>();
				//alist.add(rs.getString(1));
				//System.out.println(rs.getString(1));  
				for (String sKey: colmName) {
					hmap.put(sKey, rs.getString(sKey));
				}
				
				rsMapList.add(hmap);
				
			}
			//step5 close the connection object  			
			stmt.close();
			con.close(); 
			
			/*for (HashMap h: rsMapList) {
				System.out.println(" hmap.keySet() @@@@ "+h.keySet()); 
				System.out.println(" hmap.keySet() @@@@ "+h.values()); 
			}*/
			
			return rsMapList;

		}catch(SQLException e){ 
			System.out.println(e);
		}
		catch(Exception e){ 
			System.out.println(e);
		}
		finally {
			if (stmt!=null) {
				stmt.close();			
			}
			if (con!=null) {
				con.close();			
			}
		}
		//return resultset
		return rsMapList;  

	}  
}
