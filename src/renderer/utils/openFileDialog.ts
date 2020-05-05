import {remote} from 'electron';

export default () => {
    return remote.dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [
            {
                name: 'PGN Files',
                extensions: ['pgn']
            }
        ]
    });
}