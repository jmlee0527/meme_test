type QueryValue = string | string[] | undefined;

/** Only application state affects indexing; campaign tracking does not. */
export function isTestProgressQuery(query: Record<string, QueryValue>) {
  const includesOne = (value: QueryValue) => Array.isArray(value) ? value.includes("1") : value === "1";
  return includesOne(query.start) || includesOne(query.play) || Boolean(query.age?.length) || Boolean(query.seed?.length);
}

export function hasNameInputs(query: Record<string, QueryValue>) {
  return query.man !== undefined || query.woman !== undefined;
}
