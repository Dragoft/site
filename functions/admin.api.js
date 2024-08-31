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
		var cont = await context.request.json()
		var dat0 = await context.env.MetaDB.prepare('SELECT * from root where data="adminKey"').first()

		if (cont.key == dat0.content) {
			// id
			var now = new Date();
			var options = {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
			var formatter = new Intl.DateTimeFormat('en-US', options);
			var parts = formatter.formatToParts(now).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {});
			var preid = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;

			if (cont.id == null) {
				var id = preid
			} else {
				var id = cont.id
			}

			await context.env.MetaDB.prepare('INSERT INTO comment (id, deletable, name, content) VALUES (?, ?, ?, ?)').bind(id, cont.deletable, cont.name, cont.content).first()
			await context.env.MetaDB.prepare('UPDATE root set content=content+1 where data="comment"').first()

			var reData = {"action": "add", "id": id};
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

				var ps = context.env.MetaDB.prepare('UPDATE root set content=' + visit.toString() + ' where data="visit"');
				reData = await ps.first();

				var reData = {"action": "changeVist", "content": visit};
			}
		}
	}

	if (mode=="4") {
		if (cont!=null) {
			var ps = context.env.MetaDB.prepare('SELECT * from root where data="adminKey"');
			var dat0 = await ps.first();
			var dat0 = dat0['content'];
			var cont = cont.split("###");

			if (cont[0]==dat0) {
				var adminKey = cont[1];

				var ps = context.env.MetaDB.prepare('UPDATE root set content="' + adminKey + '" where data="adminKey"');
				reData = await ps.first();

				var reData = {"action": "changeAdminKey"};
			}
		}
	}

	if (mode=="5") {
		if (cont!=null) {
			var ps = context.env.MetaDB.prepare('SELECT * from root where data="adminKey"');
			var dat0 = await ps.first();
			var dat0 = dat0['content'];
			var cont = cont.split("###");

			if (cont[0]==dat0) {
				var sql = cont[1];

				var ps = context.env.MetaDB.prepare(sql);
				reData = await ps.all()
			}
		}
	}

	if (mode=="6") {
		var chunk = await context.request.arrayBuffer();
		var cont = cont.split("###");

		var ps = context.env.MetaDB.prepare('UPDATE file set content=? where type="info"').bind(cont[0] + '###' + cont[1] + '###' + cont[2]);
		reData = await ps.all()

		var type = "chunk" + cont[3];
		var ps = context.env.MetaDB.prepare('UPDATE file set data=? where type=?').bind(chunk, type);
		reData = await ps.all()

		reData = {'state': 'chunk uploaded successded', 'id': cont[3]};
	}

	if (mode=="7") {
		var ps = context.env.MetaDB.prepare('SELECT * from file where type="info"');
		var dat0 = await ps.first();
		var dat0 = dat0['content'];
		var cont = dat0.split("###");
		reData = {'name': cont[0], 'size': cont[1], 'chunks': cont[2]}
	}

	if (mode=="8") {
		var cont = cont.split("###");
		var type = "chunk" + cont[0];

		var ps = context.env.MetaDB.prepare('SELECT * from file where type=?').bind(type);
		var dat0 = await ps.first();
		var dat0 = dat0['data'];

		reData = {'chunk': dat0, 'id': cont[0]}

	}

	if (mode=="9") {
		var ps = context.env.MetaDB.prepare('UPDATE file SET data = ""');
		reData = await ps.all()

		var ps = context.env.MetaDB.prepare('UPDATE file set content="0###0###0" where type="info"');
		reData = await ps.all()

		reData = 'file deleted succeeded';
	}

	return Response.json(reData);
}

