export async function onRequest(context) {
	var mode = context.request.headers.get('Authorization');
	var cont = context.request.headers.get('Token');

	var reData = {state: "failed", "action": mode, "content": cont, msg: "Invalid Input"};


	// 删除留言
	if (mode=="0") {
		if (cont!=null) {
			var ps = context.env.MetaDB.prepare('DELETE FROM comment WHERE deletable = 1 and id = "' + cont + '"');
			var su = await ps.first();

			var ps = context.env.MetaDB.prepare('UPDATE root set content=content-1 where data="comment"');
			reData = await ps.first();

			var reData = {state: "success", "action": "delete", "id": cont, msg: ""};
		}
	}

	// 添加留言
	if (mode=="1") {
		if (cont!=null) {
			var cont = cont.split("###");

			var reData = {state: "failed", "action": "write", msg: "Invalid Input"};
			if (cont[1].length > 560) {return Response.json(reData)}
			if (cont[0].length > 80) {return Response.json(reData)}



			// 生成一个 id
			var now = new Date();
			var options = {timeZone: 'Asia/Shanghai', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
			var formatter = new Intl.DateTimeFormat('en-US', options);
			var parts = formatter.formatToParts(now).reduce((acc, part) => ({ ...acc, [part.type]: part.value }), {});

			var id = `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
			var sqlData = '"' + id + '", 1, "' + cont[0] + '", "' +  cont[1] + '"';

			var ps = context.env.MetaDB.prepare('INSERT INTO comment (id, deletable, name, content) VALUES (' + sqlData + ')');
			var su = await ps.first();

			var ps = context.env.MetaDB.prepare('UPDATE root set content=content+1 where data="comment"');
			reData = await ps.first();

			var reData = {state: "success", "action": "write", "id": id, msg: ""};
		}
	}

	// 读取留言数据
	if (mode=="2") {
		if (cont!=null) {
			var ps = context.env.MetaDB.prepare('SELECT * FROM comment ORDER BY id DESC LIMIT ' + cont + ', 10');
			var reData = await ps.all();
		}
	}

	// 获取留言总数
	if (mode=="3") {
		var ps = context.env.MetaDB.prepare('SELECT * from root where data="comment"');
		reData = await ps.first();
	}

	return Response.json(reData);
}



