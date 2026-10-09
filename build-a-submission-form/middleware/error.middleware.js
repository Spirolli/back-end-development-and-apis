export function notFoundHandler (req, res, next) {
	const newErr = new Error(`Did not find: ${req.originalUrl}`);
	newErr.status = 404;
	next(newErr);
}

export function finalErrorHandler (err, req, res, next) {
	let error_message;
	let statusCode = parseInt(err.status || 500, 10);
	if (isNaN(statusCode) || statusCode < 100 || statusCode > 599) {
		statusCode = 500;
	}
	console.log(err);
	res.status(statusCode).json({ error: true, 
		status: statusCode,
		message: statusCode == 500 ? 'Internal Server Error (Check Server Logs)' : err.message });
}

