import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import httpProxyMiddleware, { NextHttpProxyMiddlewareOptions } from 'next-http-proxy-middleware';


const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const isDev = process.env.NODE_ENV === 'development';
  let options: NextHttpProxyMiddlewareOptions = {
    target: process.env.NEXT_PUBLIC_API_URI,
    changeOrigin: true,
    secure: !isDev,
  };

  return httpProxyMiddleware(req, res, options);
}

export const config = {
  externalResolver: true,
  api: {
    bodyParser: false,
  },
};

export default handler;
