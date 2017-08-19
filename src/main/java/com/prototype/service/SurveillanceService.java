package com.prototype.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.prototype.business.Surveillance;
import com.prototype.mapper.ResultSummaryMapper;

import oracle.net.ns.Packet;

@Service
public class SurveillanceService {

	public List getResultSummary() {
		ArrayList<ResultSummaryMapper> aList = new ArrayList<ResultSummaryMapper>();
		// business object
		Surveillance surv = new Surveillance();

		try {
			aList = surv.getResultSummary();
			for (ResultSummaryMapper rs : aList) {
				System.out.println(rs.getControlFullName());
				System.out.println(rs.getEvtDate());

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return (List) aList;

	}

	public byte[] getSurvSummaryReport(Integer reportDate) {

		final List<ResultSummaryMapper> ResultSummaryAll = this.getResultSummary();
		System.out.println("Export report display");

		return this.exportSurvSummaryReport(ResultSummaryAll);
	}

	private byte[] exportSurvSummaryReport(List<ResultSummaryMapper> resultSummaryList) {

		final XSSFWorkbook workbook = new XSSFWorkbook();

		this.populateSheet(workbook, "SUMMARY", resultSummaryList);

		final ByteArrayOutputStream baos = new ByteArrayOutputStream();

		try {
			workbook.write(baos);
		} catch (final IOException e) {
			System.out.println("Some error while exporting..");
		}
		return baos.toByteArray();
	}

	private void populateSheet(XSSFWorkbook workbook, String tag, List<ResultSummaryMapper> targetList) {/*
		if (targetList != null && !targetList.isEmpty()) {
			final String summarySheetName = "Summary_ReportSheet";
			final XSSFSheet sheet = workbook.createSheet(summarySheetName);

			final String numberOfFieldsStr = this.messageService.getString("pdr_field_" + tag + "_count");

			// not empty
			if (!StringUtils.isEmpty(numberOfFieldsStr)) {
				final int numOfFields = Integer.parseInt(numberOfFieldsStr);

				int indexRow = 0;
				boolean headerSet = false;

				final XSSFRow header = sheet.createRow(indexRow);
				indexRow++;

				for (final ResultSummaryMapper target : targetList) {
					final XSSFRow value = sheet.createRow(indexRow);

					for (int i = 0; i < numOfFields; i++) {
						//TO DO : messageService.getString()
						final String fieldInfo = this.messageService.getString("pdr_field_" + tag + "_" + i);

						if (!StringUtils.isEmpty(fieldInfo)) {
							final String[] fieldInfoSplit = fieldInfo.split(":");
							final String propertyName = fieldInfoSplit[0];
							final String columnName = fieldInfoSplit[1];
							final String columnValue = target.retrieveStringValue(propertyName);
							if (!headerSet) {
								header.createCell(i).setCellValue(columnName);
							}
							value.createCell(i).setCellValue(columnValue);
						}
					}
					headerSet = true;
					indexRow++;
				}
			}
		}*/
	}

	
	// main to be used for Testing purpose
	/*
	 * public static void main(String[] args) { // TODO Auto-generated method
	 * stub SurveillanceService ss = new SurveillanceService();
	 * ss.getResultSummary(); //System.out.println(ss.getResultSummary());
	 * 
	 * }
	 */

}
