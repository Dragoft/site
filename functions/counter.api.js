export async function onRequest(context) {
	var mod = context.request.headers.get('Token')

	var reData = {success: false, meta: {}, results: []}
	reData.msg = 'Invalid Input'

	// 只读
	if (mod == 0) {
		reData = await context.env.MetaDB.prepare('SELECT * from root where data="visit"').all()
	}

	// 读写
	if (mod == 1) {
		await context.env.MetaDB.prepare('UPDATE root set content=content+1 where data="visit"').first()
		reData = await context.env.MetaDB.prepare('SELECT * from root where data="visit"').all()
	}

	return Response.json(reData);
}