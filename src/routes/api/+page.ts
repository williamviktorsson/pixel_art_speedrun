import type { PageLoad } from './$types';

export const load = (async ({fetch}) => {
    let stuff = await fetch('/api')
    let picos:Record<string,number> = await stuff.json()
    // record to list

    return {picos};
}) satisfies PageLoad;