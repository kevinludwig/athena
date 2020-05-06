import {remote} from 'electron';

export default () => {
    const files = remote.dialog.showOpenDialogSync({
        properties: ['openFile'],
        filters: [
            {
                name: 'PGN Files',
                extensions: ['pgn']
            }
        ]
    });
    return files && files[0];
}
