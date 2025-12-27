import { openai } from '@/lib/openai';
import { ratelimit } from '@/lib/ratelimit';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Basic rate limiting check (placeholder, needs real IP/user check implementation)
    const { success } = await ratelimit.limit('api');
    if (!success) {
        return new Response('Rate limit exceeded', { status: 429 });
    }

    const result = streamText({
        model: openai('gpt-4o'),
        messages,
    });

    return result.toDataStreamResponse();
}
