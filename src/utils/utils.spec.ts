import { base64ImageToDataUrl, clone, convertDataUrlToBlob, getByPath, getRandomInt } from '.';

describe('Utils', () => {
	describe('getRandomInt(min, max)', () => {
		it('should give a random integer for min < max', () => {
			const ranges = [
				{ min: 1, max: 10 },
				{ min: -1, max: 500 },
			];

			for (const range of ranges) {
				const randomNumber = getRandomInt(range.min, range.max);

				expect(randomNumber).toBeGreaterThanOrEqual(range.min);
				expect(randomNumber).toBeLessThanOrEqual(range.max);
			}
		});

		it('should give a random integer for max < min', () => {
			const ranges = [
				{ min: 1000, max: -3 },
				{ min: -5, max: -50 },
			];

			for (const range of ranges) {
				const randomNumber = getRandomInt(range.min, range.max);

				expect(randomNumber).toBeGreaterThanOrEqual(range.max);
				expect(randomNumber).toBeLessThanOrEqual(range.min);
			}
		});
	});

	describe('base64ImageToDataUrl(data, type)', () => {
		it('should return correct URL', () => {
			expect(base64ImageToDataUrl('one', 'png')).toBe('data:image/png;base64,one');
			expect(base64ImageToDataUrl('one')).toBe('data:image/jpg;base64,one');
			expect(base64ImageToDataUrl('')).toBe('data:image/jpg;base64,');
		});
	});

	describe('getByPath(object, path)', () => {
		it('should return correct value for a path', () => {
			const foo = { bar: { value: 'foobar' } };

			expect(getByPath(foo, 'bar.value')).toBe('foobar');
			expect(getByPath(foo, 'foo.foo')).toBe(undefined);
			expect(getByPath(foo, 'foo.foo.bar')).toBe(undefined);
		});

		it('should return correct value for a path with nested objects', () => {
			const a = { b: { value: 'ab', c: { value: 'abc', d: { value: 'abcd' } } } };

			expect(getByPath(a, 'b.c.value')).toBe('abc');
			expect(getByPath(a, 'b.c.d.value')).toBe('abcd');
			expect(getByPath(a, 'b.c.d')).toMatchObject({ value: 'abcd' });
		});
	});

	describe('clone(object)', () => {
		it('should clone an object', () => {
			const object = {
				foo: 'bar',
				arr: [{ val: 'one' }, { val: 'two' }],
				nested: {
					foobar: 42,
				},
				nil: null,
				nope: undefined,
			};

			const copy = clone(object);

			expect(object).toBe(object);
			expect(copy).not.toBe(object);

			expect(copy.foo).toBe(object.foo);

			expect(copy.arr).not.toBe(object.arr);
			expect(copy.arr[0].val).toBe(object.arr[0].val);
			expect(copy.arr[1].val).toBe(object.arr[1].val);

			expect(copy.nested).not.toBe(object.nested);
			expect(copy.nested.foobar).toBe(object.nested.foobar);

			expect(copy.nil).toBe(object.nil);
			expect(copy.nope).toBe(object.nope);
			expect((copy as any).doesNotExist).toBe((object as any).doesNotExist);
		});
	});

	describe('convertDataUrlToBlob', () => {
		it('should convert a data url to a blob', async () => {
			const jpg = `data:image/jpeg;base64,
			/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDADIiJSwlHzIsKSw4NTI7S31RS0VFS5ltc1p9tZ++u7Kf
			r6zI4f/zyNT/16yv+v/9////////wfD/////////////2wBDATU4OEtCS5NRUZP/zq/O////////
			////////////////////////////////////////////////////////////wAARCAAYAEADAREA
			AhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAQMAAgQF/8QAJRABAAIBBAEEAgMAAAAAAAAAAQIR
			AAMSITEEEyJBgTORUWFx/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAA
			AAD/2gAMAwEAAhEDEQA/AOgM52xQDrjvAV5Xv0vfKUALlTQfeBm0HThMNHXkL0Lw/swN5qgA8yT4
			MCS1OEOJV8mBz9Z05yfW8iSx7p4j+jA1aD6Wj7ZMzstsfvAas4UyRHvjrAkC9KhpLMClQntlqFc2
			X1gUj4viwVObKrddH9YDoHvuujAEuNV+bLwFS8XxdSr+Cq3Vf+4F5RgQl6ZR2p1eAzU/HX80YBYy
			JLCuexwJCO2O1bwCRidAfWBSctswbI12GAJT3yiwFR7+MBjGK2g/WAJR3FdF84E2rK5VR0YH/9k=`;

			const jpgBlob = await convertDataUrlToBlob(jpg);

			expect(jpgBlob.size).toBe(512);
			expect(jpgBlob.type).toBe('image/jpeg');
		});
	});
});
