'use server'

import {revalidateTag} from "next/cache";

async function revalidateFetch(tag: string): Promise<void> {
    revalidateTag(tag)
}

export default revalidateFetch
