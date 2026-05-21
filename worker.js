export default {

  async fetch(request, env) {

    const url = new URL(request.url);

    if (
      url.pathname === "/api/users" &&
      request.method === "GET"
    ) {

      const result = await env.DB
        .prepare(
          "SELECT * FROM users"
        )
        .all();

      return Response.json(result.results);

    }

    if (
      url.pathname === "/api/users" &&
      request.method === "POST"
    ) {

      const body = await request.json();

      await env.DB
        .prepare(
          "INSERT INTO users(name,email) VALUES(?,?)"
        )
        .bind(
          body.name,
          body.email
        )
        .run();

      return Response.json({
        success: true
      });

    }

    return new Response(
      "Not Found",
      {
        status: 404
      }
    );

  }

};
