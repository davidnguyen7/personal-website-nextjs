import {parseBody} from 'next-sanity/webhook';
import {revalidatePath} from 'next/cache';
import {NextRequest} from 'next/server';

const SANITY_REVALIDATION_KEY = process.env.SANITY_ENV_REVALIDATE_KEY;

type RevalidationPayload = {
  path?: string;
};

export async function POST(request: NextRequest) {
  try {
    if (!SANITY_REVALIDATION_KEY) {
      const message = 'Misconfigured secret key required for validation';
      return new Response(JSON.stringify({message}), {status: 500});
    }

    const {isValidSignature, body} = await parseBody<RevalidationPayload>(
      request,
      SANITY_REVALIDATION_KEY,
    );

    if (!isValidSignature) {
      const message = 'Invalid validation key';
      return new Response(JSON.stringify({message, body}), {status: 401});
    }

    if (body?.path == null) {
      const message = 'Invalid path';
      return new Response(JSON.stringify({message, body}), {status: 400});
    }

    revalidatePath(body.path);
    return new Response(JSON.stringify({body}));
  } catch (_) {
    const message = 'An unknown error occurred';
    return new Response(JSON.stringify({message}), {status: 500});
  }
}
