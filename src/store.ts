import type IdentifoAuth from "@madappgang/identifo-js";
import { writable } from "svelte/store";

export const auth = writable<IdentifoAuth>(null);
