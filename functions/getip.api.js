export async function onRequest(context) {
	var reData = {"API": mode};
	var reData = context.request.headers.get('X-Forwarded-For') || context.request.headers.get('CF-Connecting-IP');

	return Response.json(reData);
}