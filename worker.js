export default {

  async fetch(request, env) {

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    const url = new URL(request.url);

    if (
      url.pathname === "/api/users" &&
      request.method === "GET"
    ) {

      const result = await env.DB
        .prepare(
          "SELECT * FROM users ORDER BY id DESC"
        )
        .all();

      return Response.json(
        result.results,
        {
          headers: corsHeaders
        }
      );
    }

    if (
      url.pathname === "/api/users" &&
      request.method === "POST"
    ) {

      const body =
        await request.json();

      await env.DB
        .prepare(
          "INSERT INTO users (name,email) VALUES (?,?)"
        )
        .bind(
          body.name,
          body.email
        )
        .run();

      return Response.json(
        {
          success:true,
          message:"User saved"
        },
        {
          headers:corsHeaders
        }
      );
    }

    return new Response(
      "Not Found",
      {
        status:404,
        headers:corsHeaders
      }
    );
  }

};
