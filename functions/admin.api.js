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

			if (cont[0]==dat0) {
				// id
				var now = new Date();
				var options = {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
				var formatter = new Intl.DateTimeFormat('en-US', options);
				var parts = formatter.formatToParts(now).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {});
				var preid = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;

				if (cont[1]=='null') {
					var id = preid;
				} else {
					var id = cont[1];
				}
				var sqlData = '"' + id + '", "' + cont[2] + '", "' + cont[3] + '", "' +  cont[4] + '"';

				var ps = context.env.MetaDB.prepare('INSERT INTO comment (id, deletable, name, content) VALUES (' + sqlData + ')');
				var su = await ps.first();

				var ps = context.env.MetaDB.prepare('UPDATE root set content=content+1 where data="comment"');
				reData = await ps.first();

				var reData = {"action": "add", "0": cont[0], "1": cont[1], "2": cont[2], "3": cont[3], "4": cont[4]};

			}
		}
	}

	if (mode=="2") {
		if (cont!=null) {
			var ps = context.env.MetaDB.prepare('SELECT * from root where data="adminKey"');
			var dat0 = await ps.first();
			var dat0 = dat0['content'];
			var cont = cont.split("###");

			if (cont[0]==dat0) {
				var id = cont[1];

				var ps = context.env.MetaDB.prepare('DELETE FROM comment WHERE id = "' + id + '"');
				var su = await ps.first();

				var ps = context.env.MetaDB.prepare('UPDATE root set content=content-1 where data="comment"');
				reData = await ps.first();

				var reData = {"action": "delete", "target": id};

			}
		}
	}

	if (mode=="3") {
		if (cont!=null) {
			var ps = context.env.MetaDB.prepare('SELECT * from root where data="adminKey"');
			var dat0 = await ps.first();
			var dat0 = dat0['content'];
			var cont = cont.split("###");

			if (cont[0]==dat0) {
				var visit = cont[1];

				var ps = context.env.MetaDB.prepare('UPDATE root set content=' + visit + ' where data="comment"');
				reData = await ps.first();

				var reData = {"action": "changeVist", "content": visit};
			}
		}
	}






//	var reData = {"0": dat0, "type":dat3, "1": dat1};


	return Response.json(reData);
}



