import {
	createRange,
	flatten,
	getArraySum,
	getLastElement,
	getNextSibling,
	getPrevSibling,
	makeArrayUnique,
	reduceObjectArrayToObject,
	removeFromArray,
	sortByKey,
} from '.';

describe('Array Helpers', () => {
	describe('createRange(from, to)', () => {
		it('should create an array with correct length', () => {
			for (const n of [0, 1, 3, 17, 999]) {
				expect(createRange(n).length).toBe(n);
			}
			expect(createRange(0, 1).length).toBe(2);
			expect(createRange(1, 1).length).toBe(1);
			expect(createRange(3, 5).length).toBe(3);
			expect(createRange(-10, -5).length).toBe(6);
		});

		describe('flatten(array)', () => {
			it('should flatten an array of arrays', () => {
				expect(flatten([['foo', 'bar'], ['foobar']])).toEqual(['foo', 'bar', 'foobar']);
			});
		});

		it('should start and end with the correct value', () => {
			expect(createRange(5)[0]).toBe(0);
			expect(createRange(5)[4]).toBe(4);
			expect(createRange(1, 5)[0]).toBe(1);
			expect(createRange(1, 5)[4]).toBe(5);
		});
	});

	describe('getArraySum(array)', () => {
		it('should calculate the correct sum', () => {
			expect(getArraySum([1, 2, 3])).toBe(6);
			expect(getArraySum([-1, -2, 3])).toBe(0);
			expect(getArraySum(createRange(1, 10))).toBe(55);
		});
	});

	describe('removeFromArray(array, el)', () => {
		it('should remove the correct element from the array', () => {
			expect(removeFromArray([1, 2, 3], 1)).toEqual([2, 3]);
			expect(removeFromArray(['a', 'b', 'c'], 'b')).toEqual(['a', 'c']);

			const o1 = {};
			const o2 = {};
			expect(removeFromArray([o1, o2], o2)).toEqual([o1]);
		});

		it('should not remove the element from the array if it does not exist', () => {
			expect(removeFromArray([1, 2, 3], 0).length).toBe(3);
			expect(removeFromArray([1, 2, 3], 4).length).toBe(3);
		});
	});

	describe('getLastArrayElement(array)', () => {
		it('should return the last array element', () => {
			expect(getLastElement([1, 2, 3])).toBe(3);
			expect(getLastElement(['a', 'b', 'c'])).toBe('c');
			expect(getLastElement(['1', '2', '3'])).toBe('3');
		});
	});

	describe('getPrevSibling(array, el)', () => {
		it('should return the previous sibling of an element or undefined', () => {
			expect(getPrevSibling([1, 2, 3], 2)).toBe(1);

			const objectArray = [{ id: 'foo' }, { id: 'bar' }];

			expect(getPrevSibling(objectArray, objectArray[0])).toBeUndefined();
			expect(getPrevSibling(objectArray, objectArray[1])).toBe(objectArray[0]);
		});
	});

	describe('getNextSibling(array, el)', () => {
		it('should return the next sibling of an element or undefined', () => {
			expect(getNextSibling([1, 2, 3], 2)).toBe(3);

			const objectArray = [{ id: 'foo' }, { id: 'bar' }];

			expect(getNextSibling(objectArray, objectArray[1])).toBeUndefined();
			expect(getNextSibling(objectArray, objectArray[0])).toBe(objectArray[1]);
		});
	});

	describe('makeArrayUnique(array)', () => {
		it('should remove any duplicates from the array', () => {
			expect(makeArrayUnique([1, 1, 1]).length).toBe(1);
			expect(makeArrayUnique([1, 1, 1])[0]).toBe(1);
			expect(makeArrayUnique([1, 1, 2]).length).toBe(2);
			expect(makeArrayUnique([1, 1, 2])[1]).toBe(2);
		});
	});

	describe('reduceObjectArrayToObject(array)', () => {
		it('should reduce an array of objects into an object', () => {
			const objectArray: any[] = [{ a: 'foo' }, { b: 'bar' }];

			expect(reduceObjectArrayToObject(objectArray)).toEqual({ a: 'foo', b: 'bar' });

			objectArray.push(undefined);

			expect(reduceObjectArrayToObject(objectArray)).toEqual({ a: 'foo', b: 'bar' });

			objectArray.push({ a: 'foobar' });

			expect(reduceObjectArrayToObject(objectArray)).toEqual({ a: 'foobar', b: 'bar' });

			objectArray.push({ a: 'a', b: 'b' });

			expect(reduceObjectArrayToObject(objectArray)).toEqual({ a: 'a', b: 'b' });
		});
	});

	describe('sortByKey(key)', () => {
		it('should be able to be used to sort an array of objects by the given key', () => {
			const objectArray = [
				{ id: 1, name: 'foo' },
				{ id: 5, name: 'bar' },
			];

			objectArray.sort(sortByKey('id'));

			expect(objectArray[0].name).toBe('foo');

			objectArray.sort(sortByKey('name'));

			expect(objectArray[0].name).toBe('bar');
		});

		it('should be able to be used in conjunction with Array#reverse to do a descending sort', () => {
			const objectArray = [
				{ id: 1, name: 'foo' },
				{ id: 5, name: 'bar' },
			];

			objectArray.sort(sortByKey('name'));
			objectArray.reverse();

			expect(objectArray[0].name).toBe('foo');
		});

		it('should be able to be used to sort an array of object by the given key path', () => {
			const objectArray = [{ name: { first: 'foo' } }, { name: { first: 'bar' } }];

			objectArray.sort(sortByKey('name.first'));

			expect(objectArray[0].name.first).toBe('bar');
			expect(objectArray[1].name.first).toBe('foo');
		});
	});
});
