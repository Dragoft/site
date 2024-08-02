export async function onRequest(context) {
	var mode = context.request.headers.get('Token');
	var reData = {"API": mode};

	// 只读
	if (mode==0) {
		var ps = context.env.MetaDB.prepare('SELECT * from root where data="visit"');
		reData = await ps.first();
	}

	// 读写
	if (mode==1) {
		var ps = context.env.MetaDB.prepare('UPDATE root set content=content+1 where data="visit"');
		reData = await ps.first();

		var ps = context.env.MetaDB.prepare('SELECT * from root where data="visit"');
		reData = await ps.first();
	}

	return Response.json(reData);
}