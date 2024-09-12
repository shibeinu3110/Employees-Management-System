package com.globits.da.utils;

import java.util.Date;
import java.util.concurrent.TimeUnit;

public class DateTimeUtil {
	public static long getDateDiff(Date date1, Date date2,TimeUnit timeUnit) {
	    long diffInMillies = date2.getTime() - date1.getTime();
	    return timeUnit.convert(diffInMillies,TimeUnit.MILLISECONDS);
	}
}
