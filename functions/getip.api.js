export default {
	async fetch(request, env) {
		let ip = request.headers.get("X-Forwarded-For") || request.headers.get("CF-Connecting-IP");
 
		if (ip) {
			// 如果存在，直接返回 IP
			return new Response(ip, {
				headers: { "content-type": "text/plain" }
			});
		} else {
			// 如果不存在，返回错误信息
			return new Response("IP address not found", {
				status: 404,
				headers: { "content-type": "text/plain" }
			});
		}
	}
}