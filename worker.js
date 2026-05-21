const HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Users Database</title>
</head>
<body>
<h2>Cloudflare Worker Running</h2>
<p>Frontend file detected.</p>
</body>
</html>`;

export default {

  async fetch(request, env) {

    await env.DB.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT
      )
    `).run();

    const url = new URL(request.url);

    if (url.pathname === "/") {

      return new Response(HTML,{
        headers:{
          "content-type":"text/html"
        }
      });
    }

    if (
      url.pathname === "/api/users" &&
      request.method === "GET"
    ) {

      const users = await env.DB
        .prepare(
          "SELECT * FROM users ORDER BY id DESC"
        )
        .all();

      return Response.json(users.results);
    }

    if (
      url.pathname === "/api/users" &&
      request.method === "POST"
    ) {

      const body =
        await request.json();

      await env.DB
        .prepare(
          "INSERT INTO users(name,email) VALUES (?,?)"
        )
        .bind(
          body.name,
          body.email
        )
        .run();

      return Response.json({
        success:true
      });
    }

    return new Response(
      "Not Found",
      { status:404 }
    );
  }
}
