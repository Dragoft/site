export async function onRequest(context) {
	var mode = context.request.headers.get('Token');
	var reData = {"API":mode};

	// 只读取访问量
	if (mode==0) {
		var ps = context.env.MetaDB.prepare('SELECT * from root where data="visit"');
		reData = await ps.first();
	}

	// 读取并修改访问量
	if (mode==1) {
		var ps = context.env.MetaDB.prepare('UPDATE root set content=content+1 where data="visit"');
		reData = await ps.first();

		var ps = context.env.MetaDB.prepare('SELECT * from root where data="visit"');
		reData = await ps.first();
	}

	return Response.json(reData);
}