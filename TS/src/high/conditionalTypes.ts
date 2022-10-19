/**
 * 条件类型
 * T extends U ? X : Y
 */
 type typeName<T> =
 T extends string ? 'string' :
 T extends number ? 'number' :
 T extends boolean ? 'boolean' :
 T extends undefined ? 'undefined' :
 T extends Function ? 'function' :
 'object';

type t1 = typeName<string>
type t2 = typeName<string[]>