import {ExplorerReducer} from "./explorer.reducers";
import {changeDirectory} from "./explorer.actions";

describe('ExplorerReducer', () => {
    it('should change the current directory', () => {
        const state = {
            currentDirectory: 'C:\\initial\\dir',
            fileList: [],
            isFileListLoading: false
        };

        let mockedDirectory = 'C:\\mocked\\dir';
        const actual = ExplorerReducer(state, changeDirectory(mockedDirectory));
        const expected = state;

        expect(actual.currentDirectory).toBe(mockedDirectory);
    });
});