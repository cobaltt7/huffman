function sortTree(tree: CountedTree) {
	return tree.sort((a, b) => b[1] - a[1]);
}
function stripCounts(tree: CountedTree): Tree {
	return tree.map((key) =>
		typeof key[0] === "string" ? key[0] : stripCounts(key[0]),
	);
}

type Tree = (Tree | string)[];
type CountedTree = [string | CountedTree, number][];

function createTree(text: string) {
	const characters = [...text];
	const counts: { [key: string]: number } = {};
	for (const character of characters) {
		counts[character] ||= 0;
		counts[character]++;
	}
	let tree = sortTree(Object.entries(counts));
	while (tree.length > 1) {
		const left = tree.pop() || ["", 0];
		const right = tree.pop() || ["", 0];
		tree.push([[left, right], left[1] + right[1]]);
		tree = sortTree(tree);
	}
	return stripCounts(tree)[0] as Tree;
}
function treeToBits(tree: Tree,prefix="",top=true):any {
	const bits= tree.map((node, index) => {
		if(typeof node === "string"){
			return { node,index: prefix+index }
		}
		return treeToBits(node,prefix+index,false)
	}).flat()
	return top?Object.fromEntries(bits.map(({node,index}) => {
		return ([ node, index ]);
	})):bits
}
// function compress(text:string) {
// 	const tree = createTree(text);
// 	const characters = [...text];
// 	for (const character of characters) {

// 	}
// }
console.log(
	JSON.stringify(createTree(
		"Peter Piper picked a peck of picked peppers.\nA peck of picked peppers Peter Piper picked.\nIf Peter Piper picked a peck of picked peppers,\nwhere's the peck of picked peppers that Peter Piper picked?",
	)),

	JSON.stringify(treeToBits(createTree(
		"Peter Piper picked a peck of picked peppers.\nA peck of picked peppers Peter Piper picked.\nIf Peter Piper picked a peck of picked peppers,\nwhere's the peck of picked peppers that Peter Piper picked?",
	)))
);

// export {compress, decompress};
