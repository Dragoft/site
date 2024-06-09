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
			var dat0 = dat0['content'];
			if (cont==dat0) {
				var reData = {"login": 1};
			} else {
				var reData = {"login": 0};
			}
		}
	}

	if (mode=="1") {
		if (cont!=null) {
			var ps = context.env.MetaDB.prepare('SELECT * from root where data="adminKey"');
			var dat0 = await ps.first();
			var dat0 = dat0['content'];
			var cont = cont.split("###");
			var dat1 = typeof cont[0];
			var dat2 = typeof cont[1];
			var dat3 = typeof cont[2];
			var dat4 = typeof cont[3];


			if (cont[0]==dat0) {
				var reData = {"0": cont[0], "1": cont[1], "2": cont[2], "3": cont[3], "4": cont[4]};

			}
		}
	}

//	var reData = {"0": dat0, "type":dat3, "1": dat1};


	return Response.json(reData);
}



