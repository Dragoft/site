export async function onRequest(context) {
	var mode = context.request.headers.get('Authorization');
	var cont = context.request.headers.get('Token');

	var reData = {"Mode": mode, "Content": cont};
	var dat0 = '';
	var dat1 = '';

	if (mode=="0") {
		if (cont!=null) {
			var ps = context.env.MetaDB.prepare('SELECT * from root where data="adminKey"');
			var dat0 = await ps.first();
			var dat1 = dat0['content'];
			var dat3 = typeof dat0;
		}
	}


	var reData = {"0": dat0, "type":dat3, "1": dat1};






	return Response.json(reData);
}



