import { undefined } from "tslib";
import { assert, assertIterator, closeAsyncIterator, isFunction, mimic } from "@utils/utils.js";


export default mimic(undefined, "forEach", assert(isFunction, O => `${ O } is not a function`, assertIterator(
    async function (this: AsyncIterator<unknown>, _next: AsyncIterator<unknown, unknown, unknown>["next"], fn: (item: unknown) => _Awaitable<unknown>) {
        var done: boolean | undefined, value: unknown;
        while ({ done, value } = await _next(), !done) try {
            await fn(value);
        } catch (error) {
            await closeAsyncIterator(this);
            throw error;
        }
    }
)));
