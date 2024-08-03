export async function onRequest(context) {
	var reData = {"API": mode};
	var ip = request.headers.get("X-Forwarded-For") || request.headers.get("CF-Connecting-IP");



	return Response.json(ip);
}