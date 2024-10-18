import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

const handler = async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  
  // Serve index.html for the root path
  let filePath = `./public${url.pathname}`;
  if (url.pathname === "/") {
    filePath = "./public/index.html";
  }

  try {
    const file = await Deno.readFile(filePath);
    const fileExtension = filePath.split('.').pop() || '';
    const mimeType = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
    }[fileExtension] || 'application/octet-stream';

    return new Response(file, { status: 200, headers: { 'Content-Type': mimeType } });
  } catch (_error) {
    return new Response("File not found", { status: 404 });
  }
};

console.log("Serving on http://localhost:8080");
serve(handler);
