import {CommonValuesHelper} from "./common-values-helper";

describe('CommonValuesHelper', () => {
    let testSubject: CommonValuesHelper = new CommonValuesHelper();
    let initialValues: Object;

    beforeEach(() => {
        initialValues = {
            comment: undefined,
            fromDay: undefined,
            fromMonth: undefined,
            fromYear: undefined,
            toDay: undefined,
            toMonth: undefined,
            toYear: undefined,
            tags: []
        }
    });

    it('should return initialValues when empty array is passed in', () => {
        let images = [];

        let commonValues = testSubject.getCommonValues(initialValues, images);

        expect(commonValues).toEqual(initialValues);
    });

    it('should return image when one image is passed in', () => {
        let images = [
            { id: 1, path: 'path', name: 'A', comment: 'Lorem ipsum.', tags: [] }
        ];

        let commonValues = testSubject.getCommonValues(initialValues, images);

        ensureIgnoredAttributesAreNotSet(commonValues);
        expect(commonValues.comment).toEqual(images[0].comment);
    });

    it('should return common values', () => {
        let images = [
            { id: 1, path: 'path', name: 'A', comment: 'Lorem ipsum.', fromDay: 12, tags: [] },
            { id: 2, path: 'path', name: 'B', comment: 'Lorem ipsum.', fromDay: 12, tags: [] },
            { id: 3, path: 'path', name: 'C', comment: 'Lorem ipsum.', fromDay: 12, tags: [] }
        ];

        let commonValues = testSubject.getCommonValues(initialValues, images);

        ensureIgnoredAttributesAreNotSet(commonValues);
        expect(commonValues.comment).toEqual(images[0].comment);
        expect(commonValues.fromDay).toEqual(images[0].fromDay);
    });

    it('should return initialValues when images have no values in common', () => {
        let images = [
            { id: 1, path: 'path 1', name: 'A', comment: 'Lorem ipsum 1.', fromDay: 12, tags: [] },
            { id: 2, path: 'path 2', name: 'B', comment: 'Lorem ipsum 2.', toDay: 13, tags: [] },
            { id: 3, path: 'path 3', name: 'C', comment: 'Lorem ipsum 3.', tags: [] }
        ];

        let commonValues = testSubject.getCommonValues(initialValues, images);

        ensureIgnoredAttributesAreNotSet(commonValues);
        expect(commonValues).toEqual(initialValues);
    });

    it('should return initialValues even if some images have values in common', () => {
        let images = [
            { id: 1, path: 'path', name: 'A', comment: 'Lorem ipsum.', fromDay: 12, tags: [] },
            { id: 2, path: 'path', name: 'B', comment: 'Lorem ipsum.', fromDay: 12, fromMonth: 1, tags: [] },
            { id: 3, path: 'path', name: 'C', comment: 'Dolor sit amet.', fromMonth: 1, tags: [] }
        ];

        let commonValues = testSubject.getCommonValues(initialValues, images);

        ensureIgnoredAttributesAreNotSet(commonValues);
        expect(commonValues).toEqual(initialValues);
    });

    it('should return common value if values are arrays', () => {
        let images = [
            { id: 1, path: 'path', name: 'A', tags: [{ id: 1, name: 'Tag 1' }] },
            { id: 2, path: 'path', name: 'B', tags: [{ id: 1, name: 'Tag 1' }] }
        ];

        let commonValues = testSubject.getCommonValues(initialValues, images);

        ensureIgnoredAttributesAreNotSet(commonValues);
        expect(commonValues.tags).toEqual( [{ id: 1, name: 'Tag 1' }] );
    });

    it('should return common value if values are different arrays', () => {
        let images = [
            { id: 1, path: 'path', name: 'A', tags: [{ id: 1, name: 'Tag 1' }, { id: 2, name: 'Tag 2' }, { id: 3, name: 'Tag 3' }, { id: 4, name: 'Tag 4' }] },
            { id: 2, path: 'path', name: 'B', tags: [{ id: 1, name: 'Tag 1' }, { id: 2, name: 'Tag 2' }, { id: 3, name: 'Tag 3' }, { id: 5, name: 'Tag 5' }] }
        ];

        let commonValues = testSubject.getCommonValues(initialValues, images);

        ensureIgnoredAttributesAreNotSet(commonValues);
        expect(commonValues.tags).toEqual( [{ id: 1, name: 'Tag 1' }, { id: 2, name: 'Tag 2' }, { id: 3, name: 'Tag 3' }] );
    });

    it('should return empty array when array is set on second item', () => {
        let images = [
            { id: 1, path: 'path', name: 'A' },
            { id: 2, path: 'path', name: 'B', tags: [{ id: 1, name: 'Tag 1' }, { id: 2, name: 'Tag 2' }] }
        ];

        let commonValues = testSubject.getCommonValues(initialValues, images);

        ensureIgnoredAttributesAreNotSet(commonValues);
        expect(commonValues.tags).toEqual([]);
    });

    it('should return empty array when array is set on first item', () => {
        let images = [
            { id: 1, path: 'path', name: 'A', tags: [{ id: 1, name: 'Tag 1' }, { id: 2, name: 'Tag 2' }] },
            { id: 2, path: 'path', name: 'B' }
        ];

        let commonValues = testSubject.getCommonValues(initialValues, images);

        ensureIgnoredAttributesAreNotSet(commonValues);
        expect(commonValues.tags).toEqual([]);
    });
});

function ensureIgnoredAttributesAreNotSet(result) {
    expect(result.hasOwnProperty('id')).toBeFalsy();
    expect(result.hasOwnProperty('path')).toBeFalsy();
    expect(result.hasOwnProperty('name')).toBeFalsy();
}