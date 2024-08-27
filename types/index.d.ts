declare function sortTree(tree: CountedTree): CountedTree;
declare function stripCounts(tree: CountedTree): Tree;
declare type Tree = (Tree | string)[];
declare type CountedTree = [string | CountedTree, number][];
declare function createTree(text: string): Tree;
declare function treeToBits(tree: Tree, prefix?: string, top?: boolean): any;
