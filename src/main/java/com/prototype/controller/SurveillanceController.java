package com.prototype.controller;

import java.text.MessageFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.prototype.mapper.ResultSummaryMapper;
import com.prototype.service.SurveillanceService;

@RestController
@RequestMapping("/surveillance")
public class SurveillanceController {

	@Value("${report.name}")
	private String reportName;

	@Value("${report.ext}")
	private String reportExt;

	@Autowired
	private SurveillanceService surveillanceService;

	@RequestMapping(value = { "/getResultSummary" }, method = RequestMethod.GET)
	public List<ResultSummaryMapper> getReportSummary() {
		return this.surveillanceService.getResultSummary();
	}

	@RequestMapping(path = "/detailreport", method = RequestMethod.GET)
	public HttpEntity<byte[]> getPacketDetailReport(@PathVariable("reportDate") Integer reportDate) {

		final byte[] documentBody = this.surveillanceService.getSurvSummaryReport(reportDate);

		final HttpHeaders header = new HttpHeaders();
		header.setContentType(new MediaType("application", "vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
		final String filename = MessageFormat.format(this.reportName, reportDate.toString());
		header.set("Content-Disposition", "attachment; filename=" + filename + "." + this.reportExt);

		if (documentBody != null) {
			header.setContentLength(documentBody.length);
		}

		return new HttpEntity<byte[]>(documentBody, header);
	}

}
